import { Profile } from "./profile";

export interface Activity {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string;
  isCancelled: boolean;
  isGoing: boolean;
  isHost: boolean;
  host?: Profile;
  attendees: Profile[];
}

export class Activity implements Activity {
  constructor(init?: ActivityFormValues) {
    Object.assign(this, init);
  }
}

export class ActivityFormValues {
  id?: string;
  title: string = "";
  category: string = "";
  description: string = "";
  date: Date | null = null;
  city: string = "";
  venue: string = "";

  constructor(acttivity?: ActivityFormValues) {
    if (acttivity) {
      this.id = acttivity.id;
      this.title = acttivity.title;
      this.category = acttivity.category;
      this.description = acttivity.description;
      this.date = acttivity.date;
      this.city = acttivity.city;
      this.venue = acttivity.venue;
    }
  }
}
