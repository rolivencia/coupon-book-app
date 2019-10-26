import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  private themes = [
    {
      color: "white",
      hexColor: "#040404",
      backgroundColor: "dark",
      logo: "logo-black"
    },
    {
      color: "white",
      hexColor: "#7B6655",
      backgroundColor: "tertiary",
      logo: "logo-lightbrown"
    },
    {
      color: "white",
      hexColor: "#C41013",
      backgroundColor: "danger",
      logo: "logo-red"
    },
    {
      color: "black",
      hexColor: "#ffffff",
      backgroundColor: "light",
      logo: "logo-white"
    }
  ];

  private _currentTheme: Theme;

  constructor() {
    this.currentTheme = this.themes[
      Math.floor(Math.random() * this.themes.length)
    ];
  }

  get currentTheme(): Theme {
    return this._currentTheme;
  }

  set currentTheme(value: Theme) {
    this._currentTheme = value;
  }
}

export class Theme {
  public color: string;
  public hexColor: string;
  public logo: string;
  public backgroundColor: string;
}
