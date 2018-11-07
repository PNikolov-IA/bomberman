import { injectable } from 'inversify';
import { IIntance } from '../contracts';

@injectable()
export class InstanceTemplate {
  private readonly fullTemplate: string = `<div class="instance-wrapper">
  <div class="instance layout-{1}">{2} / {3}</div>
  {4}
</div>`;

  private readonly joinButton: string = `<div id="join-{0}">Join</div>`;

  public constructor() {
    // Nothing
  }

  public compile(instance: IIntance): string {
    return this.fullTemplate
      .replace('{1}', instance.layout.toString())
      .replace('{2}', instance.players.toString())
      .replace('{3}', instance.maxPlayers.toString())
      .replace('{4}', instance.players < instance.maxPlayers ? this.joinButton.replace('{0}', instance.id.toString()) : '');
  }

}
