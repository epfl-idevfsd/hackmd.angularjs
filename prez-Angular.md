---
title: Présentation de Angular JS, EPFL VPSI — Décembre 2019
filename: prez-Angular.md
tags: AngularJS, EPFL
description: View the slide with "Slide Mode".
lang: fr
slideOptions:
  transition: fade
  theme: white
  spotlight:
    enabled: true
---

<!-- .slide: data-background="/uploads/upload_d2f9bfe701c518fed2adf0acc92d7a44.png" -->

# Workshop IDEV Angular.js 8

![](https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg) <!-- .element: id="angular-splash-logo" class="logo" -->

## Décembre 2019


## [go/workshop-angular](https://go.epfl.ch/workshop-angular)

---

# Telegram ![](https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg) <!-- .element: class="inline logo" -->


Tous les garçons cool l'ont !

<!-- .slide: data-background="/uploads/upload_ec5322e51681d13ba3d9b47198b3b236.png" -->

![](https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_05bcc1745e405bddd044be4c00c57262.png) <!-- .element: id="telegram-qrcode" -->


---

# Demandez le programme...

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_01f72874aa7fabff68275ee0e8ff3bb0.png" -->

- AngularJS par la pratique <!-- .element: class="fragment" data-fragment-index="1" -->
- Programme / courbe d'apprentissage <!-- .element: class="fragment" -->
- The occasional diatribe <!-- .element: class="fragment" -->


---

# On plonge !

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_b3ddda2b449c1f972b630f70cc139edb.png" -->


| Si vous aimez... | vous aimerez...                           |
| ---------------- | ----------------------------------------- |
| ☁️ les nuages ☁️ | [stackblitz.com](https://stackblitz.com/) |
| Votre laptop     | [cli.angular.io](https://cli.angular.io/) |
| Emacs            | `M-x package-install` ⏎ <br/> `tide` ⏎         |


---

# Exercice 1 : “Hello world”

Vous connaissez la musique...
![Je saisis mon prénom, l'affichage se met à jour](https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_c5ee461f0a1dcc7a9705c8e8938ef1d3.gif)

----

# Exercice 1

<div style="text-align: center; font-size: 400%;"><p>💡</p></div>

- Commencer par la vue «mock» (avec le HTML souhaité, mais aucun comportement)
- Pas besoin de `<form>`

----

# Exercice 1


«Moustacher» le mot `Angular` de `Hello, Angular` depuis une variable d'instance du contrôleur.

![](https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_e5d0b06ebbf9b3a01ae5197dc45ec07d.gif) <!-- .element: style="float: right; width: 50%; " -->
:hammer_and_wrench: Avec Chrome et [Augury](https://chrome.google.com/webstore/detail/augury/elgalmkoelokbchhkhacckoklkejnhcd?hl=fr), c'est suffisant pour bidouiller «à la main» :

----

# Exercice 1

**[Google est votre ami](https://www.google.com/search?q=angular+input+change+event).**

```html
<input type="text" (input)="console.log('bah!')">
```
<!-- .element: class="fragment" data-fragment-index="1" -->

... Mais Angular ? Pas toujours. <!-- .element: class="fragment" data-fragment-index="2" -->
```javascript
@Component{...}
export class AppComponent {
    console = window.console
}
```
<!-- .element: class="fragment" data-fragment-index="2" -->

----

# Exercice 1

Comment savoir quoi mettre dans `(input)="..."` ?

**Le débogueur du navigateur est aussi votre ami.**

```html
<input type="text" (input)="inputChanged()">
```

```javascript
@Component{...}
export class AppComponent {
    inputChanged() {
        debugger;
    }
}
```

----

# Exercice 1

<div style="text-align: center; font-size: 400%;"><p>💡</p></div>

**Tous les «tuyaux» vus pour l'exercice 1 restent valables dans la vraie vie.**

- Division du travail (HTML, CSS, JS)
- Buts intermédiaires
- Outillage : débogueur du navigateur + Augury

---

# Exercice 1 : solution

https://stackblitz.com/edit/epfl-angular-exercice1

---

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_5a8a5c9fa3ab182eb1dbc71172eb0d2f.png"
data-separator-notes="^Notes:" -->


# Exercice 1 : décortiquage

Note:
- app.component.ts : le `Component`
- app.module.ts : I is serious framwerk. I haz modules.
- Une brève plongée dans les *templates* et les événements
- Les dépendances dans `package.json`, et en particulier les `@types`

---

# Exercice 2

refactorer pour créer `HelloComponent`

```js
<h1>Hello, {{ name }}!</h1>
```

Pour le ~~JavaScript~~ TypeScript, à vous de jouer !

----

# Exercice 2 : solution

Si vous aviez deviné que la solution serait à l'adresse <!-- .element: class="fragment" data-fragment-index="1" -->

https://stackblitz.com/edit/epfl-angular-exercice2

... alors vous avez gagné ! <!-- .element: class="fragment" data-fragment-index="1" -->

---

# Fin de l'étape

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_499143d421216cb3a57986c10f2815be.png" -->

- Révisions JS (`npm`, ES2015, `import` / `export`)
- TypeScript : types... et décorateurs
- Angular : *templates*, événements... Et bien plus encore !

---

# Tests avec <br/>![](https://angular.io/generated/images/marketing/concept-icons/protractor.svg)<!-- .element: class="inline logo" --> Protractor

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_1b693cd34f87fd89f8f7373cc4b62e12.png" -->

`ng test`
<!-- .element: class="huge fragment" -->

Note:
- À présent chacun doit installer Angular sur son laptop, si pas déjà fait
- 

<!--
  If you want/need a resizable background image, add the background-size: cover; property and change background-position: 0px 0px;
-->
<style>
  .reveal {
    background-color: #fff;
    background-image: url('https://epfl-idevelop.github.io/elements/svg/epfl-logo.svg');
    background-repeat: no-repeat;
    background-position: 5px 5px;
     color: #707070;
  }
  .reveal h1, .reveal h2, .reveal h3,
  .reveal h4, .reveal h5, .reveal h6 {
    color: #212121;
  }
  .reveal a {
    color: #f009;
  }
  .reveal a:hover {
    color: #f00;
  }
  .reveal code {
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(255, 255, 255, 0.46);
    border-radius: 3px;
  }
  img[alt$=">"] {
    float: right;
  }
  img[alt$="<"] {
    float: left;
  }
  img[alt$="><"] {
    display: block;
    max-width: 100%;
    height: auto;
    margin: auto;
    float: none!important;
  }
  .reveal [data-background] > div {
    background-color: #ffffff94;
    border-radius: 20px;
  }
  .reveal [data-opacity="full"] > div {
    background-color: white;
  }
  .reveal section .logo {
      border: none;
      box-shadow: none;
      background: none;
  }
  .reveal section img.inline.logo {
      max-width: 60pt;
      margin: unset;
  }
  #telegram-qrcode {
      max-width: 40%;
      border: none;
  }
  .reveal .huge.fragment {
    font-size: 400%;
    padding-bottom: 0.5em;
  }
  .reveal .huge.fragment code {
    background-color: white;
  }
</style>
