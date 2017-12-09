# mp3gain.js - lossless mp3 normalizer, into the browser

mp3gain.js is the port of [MP3Gain](http://mp3gain.sourceforge.net/) in javascript via [Emscripten](http://kripken.github.io/emscripten-site/).

[Online demo available here](https://ybootin.github.io/mp3gain.js/demo)

## Description

mp3gain can analyze and adjust mp3 files  so that they have the same volume.

mp3gain does not just do peak normalization,  as many normalizers do. Instead, it does some statistical analysis to  determine how loud the file actually sounds to the human ear. Also, the  changes mp3gain makes are completely lossless. There  is no quality lost in the change because the program adjusts the mp3 file  directly, without decoding and re-encoding. Also, this works with all mp3  players, i.e. no support for a special tag or something similar is  required.

mp3gain actually changes your file's gain only  when you use one of the options -r,  -a,  -g, or -l. If none of these options is  given, only a tag denoting the recommended gain change is written to the  file. If you only want to print the recommended gain change (and not modify  the file at all) you have to use the -s s (skip tag)  option.  

The method mp3gain uses to determine the desired volume  is described at  www.replaygain.org (link to URL http://www.replaygain.org/)

## Usage

You can install the lib via NPM: 

    npm install --save mp3gain.js

The js files are available in the `node_modules/mp3gain.js/dist` folder : 

  - `mp3gain.js`, `mp3gain.min.js` - the all in one file, include the JS wrapper and the mp3gain worker 
  - `mp3gain-wrapper.js`, `mp3gain-wrapper.min.js` - The JS wrapper for the binary and the worker, for advanced use
  - `mp3gain-worker.js` - the original mp3gain app compiled with emscriten, for use with the JS wrapper

This is project is only for browser use, Nodejs is not supported at this time.
For a quick start, we recommand using the `mp3gain.js` file.
```
<script src="/path/to/mp3gain.js"></script>
<script>
  // instanciate the normalizer
  var normalizer = mp3gain.getInstance()

  // load files to be normalized from URL (must be accessible with CORS)
  // will return a promise
  normalizer.loadFiles([
    'http://mydomain/myfile1.mp3',
    'http://mydomain/myfile2.mp3',
  ])
  .then(function(files) { // files is an array of {name: filename, data: UInt8Array}
    // at this point your files are loaded into the app and ready to be normalized
    // the run method take a list of arguments, available here, and return a promise with the normalized files once done
    // -a arg will normalize gain for the wholes files (album gain)
    return normalizer.run('-a')
  }).then(function(normalizedFiles) {
    // normalizedFiles is an array of {name: filename, data: UInt8Array} @see #common-interface-for-file
    console.log(normalizedFiles)
  }).catch(function(error) {
    // catch error from load or normalized here
    console.error(error)
  })
</script>
```
## JS API Documentation

### Common interface for file

    interface IFile {
      name: string,
      data: Uint8Array
    }

### mp3gain instance methods
instanciate mp3gain with `mp3gain.getInstance()`

method           | description 
-----------------|-------------
`addFile(file: IFile): void`| add a binary file to normalize 
`addFiles(files: Array<IFile>): void`| add multiples binary files to normalize 
`loadFile(name: string, url: string): Promise<IFile>`| load MP3 file with xhr, and add it 
`loadFiles(files: Array<string>): Promise<IFile[]>`| load MP3 files with xhr, and add them 
`removeFile(file: IFile): void` | remove file to normalize 
`removeFiles(): void` | remove all files to normalize 
`getOriginalFiles(): Array<IFile>` |  return the added files with addFile 
`run(args: string): Promise<IFile[]>` | launch the processing and return a promise with all the normalized files, see run arguments bellow


## run arguments
Adapted from [from debian documentation](https://www.mankier.com/1/mp3gain)

arguments | descriptions 
---------|-------------
`-? -h` | Show summary of options. 
`-g i` | apply gain i to mp3 without,doing any analysis 
`-l 0 i` | apply gain i to channel 0,(left channel) of mp3,without doing any analysis (ONLY works for STEREO mp3s,,not Joint Stereo mp3s) 
`-l 1 i` | apply gain i to channel 1,(right channel) of mp3,without doing any analysis (ONLY works for STEREO mp3s,,not Joint Stereo mp3s) 
`-r` | apply Track gain automatically (all files set to equal loudness) 
`-k` | automatically lower Track gain to not clip audio 
`-a` | apply Album gain automatically (files are all from the same,album: a single gain change is applied to all files, so,their loudness relative to each other remains unchanged,,but the average album loudness is normalized) 
`-m i` | modify suggested MP3 gain by integer i 
`-d n` | modify suggested dB gain by floating-point,n 
`-c` | ignore clipping warning when applying gain 
`-o` | output is a database-friendly tab-delimited list 
`-t` | mp3gain writes modified mp3 to temp file, then deletes original,instead of modifying bytes in original file (This is the default in,Debian) 
`-T` | mp3gain modifys bytes in original file instead of,writing to temp file. 
`-q` | Quiet mode: no status messages 
`-p` | Preserve original file timestamp 
`-x` | Only find max. amplitude of mp3 
`-f` | Force mp3gain to assume input file,is an MPEG 2 Layer III file,(i.e. don't check for mis-named Layer I or Layer II files) 
`-s c` | only check stored tag info (no other processing) 
`-s s` | skip (ignore) stored tag info (do not read or write tags) 
`-s r` | force re-calculation (do not read tag info) 
`-u` | undo changes made by mp3gain (based on stored tag info) 
`-w` | "wrap" gain change if gain+change > 255 or gain+change < 0,(see below or use -? wrap switch for a complete,explanation) 
`-v`| Show version of program.If you specify -r and -a,,only the second one will work. 

If you do not specify `-c`, the program will  stop and ask before  applying gain change to a file that might clip

### The WRAP option
Here's the problem:  The "global gain" field that mp3gain adjusts is an 8-bit unsigned integer, so  the possible values are 0 to 255.

MOST mp3 files (in fact, ALL the mp3 files I've examined so far) don't go  over 230. So there's plenty of headroom on top-- you can increase the gain  by 37dB (multiplying the amplitude by 76) without a problem.

The problem is at the bottom of the range. Some encoders create frames with  0 as the global gain for silent frames.  What happens when you _lower_ the global gain by 1?  Well, in the past, mp3gain always simply wrapped the result up to 255.  That way, if you lowered the gain by any amount and then raised it by the  same amount, the mp3 would always be _exactly_ the same.

There are a few encoders out there, unfortunately, that create 0-gain frames  with other audio data in the frame.  As long as the global gain is 0, you'll never hear the data.  But if you lower the gain on such a file, the global gain is suddenly _huge_.  If you play this modified file, there might be a brief, very loud blip.

So now the default behavior of mp3gain is to _not_ wrap gain changes.  In other words,

1. If the gain change would make a frame's global gain drop below 0,  then the global gain is set to 0.
2. If the gain change would make a frame's global gain grow above 255,  then the global gain is set to 255.
3. If a frame's global gain field is already 0, it is not changed, even if  the gain change is a positive number.

To use the original "wrapping" behavior, use the `-w` switch.



## Advanced usage

### Use the mp3gain-wrapper.js as main asset to reduce page time load

mp3gain.js is easy for a quick start, because it embed the binary and the worker, so you don't have to deal with others assets. But the file size is big (650k minified, 210k gzip), and probably you'll prefer use the mp3gain-wrapper.js which is less than 10k gzip.

mp3gain-wrapper.js use the exact same interface than mp3gain.js, only the instanciation change :

    <script src="/path/to/mp3gain-wrapper.js"></script>
    <script>
      // instanciate the normalizer, by specified the path of the worker
      var normalizer = new mp3gain.MP3GainWrapper('/path/to/mp3gain-worker.js')

      // ... then do the stuff as usual !
      normalizer.loadFiles([...]).then(function() {
        return normalizer.run('-a)
      }).then(function(normalizedFiles) {
        // do what you want with your files
      }).catch(function(error) {
        // handle error
      })
    </script>


## Build

Docker is required, as i use an emscripten docker image as a compiler to compile the main C code in javascript.

Use `npm run build` to build all the files into `dist/`.

Use `npm run buildwrapper` to compile only the `dist/mp3gain-wrapper.js` file

Use `npm run buildbinary` to compile the original mp3gain C code into `dist/mp3gain-binary.js` file

Use `npm run buildworker` to build the `dist/mp3gain-worker.js` file

Use `npm run minify` to minify all the assets

Use `npm run clean` to clean the `dist` folder




## See Also
The homepage of mp3gain is located at  http://mp3gain.sourceforge.net/


