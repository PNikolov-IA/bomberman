export interface IUser {
  id: number;
  gamesPlayed: number;
  loggedInOn: Date;
  timeOnline: number;
  ingame: boolean;
  join(): void;
  leave(): void;
}
