/// <reference path="./MP3Gain.ts" />

/**
 * The all in one embed version of MP3gain
 * Binary and worker are substitue after build
 */

namespace mp3gain {
  const binary: string = '%MP3GAINBINARY%'
  const worker: string = '%MP3GAINWORKER%'


  export function getInstance(): MP3GainEmbed {
    return instance
  }

  export class MP3GainEmbed extends MP3Gain {
    constructor() {
      // no need to defined in constructor as are redefine on runAsWorker and runWithEmloader
      super('undefined')
    }

    public runAsWorker(args: Array<string>|string): Promise<emloader.IFile[]> {
      // include the worker code before append the binary code in order to init postMessage API
      this.binpath = 'data:text/javascript;base64,' + btoa(atob(worker) + atob(binary))

      return super.runAsWorker(args)
    }

    public runWithEmloader(args: Array<string>|string): Promise<emloader.IFile[]> {
      this.binpath = 'data:text/javascript;base64,' + binary

      return super.runAsWorker(args)
    }
  }

  const instance: MP3GainEmbed = new MP3GainEmbed()
}

