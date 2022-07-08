import {AbstractSongPlayer} from "~~/lib/Songs/AbstractSongPlayer";
import {LoopSongFilesInterface} from "@/shared/LoopSongFilesInterface";
import {Song} from "~~/lib/Songs/Song";

export class LoopSongPlayer extends AbstractSongPlayer {

  constructor(song: Song) {
    super(song);

    this.createTrack('loop');

    if (song.manifest.playerSettings?.crossFade) {
      this.createTrack('loopFade');
    }
  }

  protected async initTracks(): Promise<void> {
    let files = this.song.getFiles<LoopSongFilesInterface>();

    if (!files.loop) {
      throw new Error('Loop file does not exist');
    }

    await this.initTrack(this.tracks.loop, files.loop);

    if (this.song.manifest.playerSettings?.crossFade) {
      await this.initTrack(this.tracks.loopFade, files.loop);
    } else {
      this.tracks.loop.audio.loop = true;
    }
  }

  protected async startTracks(): Promise<void> {
    await this.tracks.loop.audio.play();
    if (this.song.manifest.playerSettings?.crossFade) {
      let audio = this.tracks.loop.audio;

      this.tracks.loop.audio.addEventListener('timeupdate', async () => {
        if (this.state === 'playing' && audio.duration - audio.currentTime < this.song.manifest.playerSettings?.crossFade) {
          this.state = 'starting';
          let fadeTrack = this.tracks.loopFade;
          this.tracks.loopFade = this.tracks.loop;
          this.tracks.loop = fadeTrack;
          this.crossFadeOut();
          await this.crossFadeIn();
          this.state = 'playing';
        }
      });
    }
  }

  protected async crossFadeOut() {
    if (this.tracks.loopFade.audio.paused) {
      this.tracks.loopFade.audio.play();
    }

    if (this.song.manifest.playerSettings?.crossFadeOutSpeed) {
      await this.fadeOut(this.song.manifest.playerSettings.crossFadeOutSpeed, (mod) => {
        this.tracks.loopFade.gain.gain.value = this.getVolume(mod);
      });

      this.tracks.loopFade.audio.pause();
    }
  }

  protected crossFadeIn() {
    return new Promise<void>((resolve) => {
      let fadeDone = false;
      let oldSongDone = false;

      if (!this.song.manifest.playerSettings?.crossFadeOutSpeed) {
        this.tracks.loopFade.audio.addEventListener('ended', () => {
          oldSongDone = true;

          if (fadeDone) {
            resolve();
          }
        }, {once: true});
      } else {
        oldSongDone = true;
      }

      this.tracks.loop.audio.play().then(() => {
        if (this.song.manifest.playerSettings?.crossFadeInSpeed) {
          this.fadeIn(this.song.manifest.playerSettings.crossFadeInSpeed, (mod) => {
            this.tracks.loop.gain.gain.value = this.getVolume(mod);
          }).then(() => {
            fadeDone = true;

            if (oldSongDone) {
              resolve();
            }
          });
        } else {
          fadeDone = true;
        }
      });
    });
  }

  protected stopTracks(): void {
    this.tracks.loop.audio.pause();
  }

  public pauseTracks(): void {
    this.tracks.loop.audio.pause();
  }

  public unPauseTracks(): Promise<void> {
    return this.tracks.loop.audio.play();
  }

  protected purgeTracks(): void {
    this.purgeTrack(this.tracks.loop);

    if (this.song.manifest.playerSettings?.crossFade) {
      this.purgeTrack(this.tracks.loopFade);
    }
  }

  public getDuration(): number {
    return this.tracks.loop.audio.duration;
  }

  protected getCurrentTime(): number {
    return this.tracks.loop.audio.currentTime;
  }

  protected setCurrentTime(progress: number): void {
    this.tracks.loop.audio.currentTime = progress;
  }
}
