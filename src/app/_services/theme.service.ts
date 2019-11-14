import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  private themes = [
    {
      color: "white",
      hexColor: "#ffffff",
      hexBackgroundColor: "#040404",
      backgroundColor: "dark",
      logo: "logo-black"
    },
    {
      color: "white",
      hexColor: "#ffffff",
      backgroundColor: "tertiary",
      hexBackgroundColor: "#7B6655",
      logo: "logo-lightbrown"
    },
    {
      color: "white",
      hexColor: "#ffffff",
      backgroundColor: "danger",
      hexBackgroundColor: "#C41013",
      logo: "logo-red"
    },
    // {
    //   color: "black",
    //   hexColor: "#ffffff",
    //   backgroundColor: "light",
    //   logo: "logo-white"
    // }
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
  public hexBackgroundColor: string;
  public logo: string;
  public backgroundColor: string;
}
