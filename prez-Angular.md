---
title: Présentation de Angular JS, EPFL VPSI — Décembre 2019
filename: prez-Angular.md
tags: AngularJS, EPFL
description: View the slide with "Slide Mode".
lang: fr
slideOptions:
  transition: fade
  theme: white
---

<!-- .slide: data-slide-id="home" data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_d2f9bfe701c518fed2adf0acc92d7a44.png" data-opacity="over9k" -->

# Workshop IDEV

## Angular.js 8

![logo Angular](https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg) <!-- .element: id="angular-splash-logo" class="logo" -->

Décembre 2019

## [go/workshop-angular](https://go.epfl.ch/workshop-angular)

---

# Telegram ![](https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg) <!-- .element: class="inline logo" -->


Tous les garçons cool l'ont !

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_ec5322e51681d13ba3d9b47198b3b236.png" -->

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
:wrench: Avec Chrome et [Augury](https://chrome.google.com/webstore/detail/augury/elgalmkoelokbchhkhacckoklkejnhcd?hl=fr), c'est suffisant pour bidouiller «à la main» :

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

-  ![](https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg) <!-- .element: class="inline logo" -->  Révisions JS (`npm`, ES2015, `import` / `export`)
- ![](https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg) <!-- .element: class="inline logo" --> TypeScript : types... et décorateurs
- ![](https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg) <!-- .element: class="inline logo" --> Angular : *templates*, événements... Et bien plus encore !

---

# Tests avec <br/>![Protractor logo](https://angular.io/generated/images/marketing/concept-icons/protractor.svg)<!-- .element: class="inline logo" --> Protractor

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_1b693cd34f87fd89f8f7373cc4b62e12.png" -->

<p class="huge fragment"><code>ng test</code> <s class="fragment" data-fragment-id="2">☁️</s></p>

Note:
- À présent chacun doit installer Angular sur son laptop, si pas déjà fait

---

# Exercice 3

Pré-requis : `ng test` est «vrai rouge» (pas de crash)

→ Si nécessaire, se resynchroniser depuis [go/workshop-angular-exercices](https://go.epfl.ch/workshop-angular-exercices)

----

# Exercice 3

## `app.component.spec.ts`

```javascript
// ...
describe('AppComponent', () => {
  // ...
  it('updates the title', () => {
  })
})
```

----

## `app.component.spec.ts`

<!-- HTML laborieusement copié-collé depuis le rendu du slide
     ci-dessus, parce que extras.js de codimd insiste pour prendre
     le contrôle de hljs (et en passant, exiger de travailler sur
     le innerHTML du <code> et donc se viander sur les chevrons),
     plutôt que de laisser Reveal.js s'en charger (auquel cas,
     selon la documentation, on pourrait utiliser du balisage sous
     un <pre>, sans empêcher le parseur de faire son travail !!)
 -->
<pre><code class="javascript hljs"><span class="hljs-comment">// ...</span>
<mark>describe</mark>(<span class="hljs-string">'AppComponent'</span>, () =&gt; {
  <span class="hljs-comment">// ...</span>
  <mark>it</mark>(<span class="hljs-string">'updates the title'</span>, () =&gt; {
    <span class="hljs-comment">// ...</span>
  })
})
</code></pre>

<p class="fragment"><code><mark>describe</mark></code>, <code><mark>it</mark></code> ← le BDD de <a href="https://jasmine.github.io/">Jasmine</a> <img alt="Jasmine logo" src="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_0875a6880fd79a26b5a02af4117901da.png" class="inline logo"></p>

----

<pre><code class="javascript hljs"><span class="hljs-comment">// ...</span>
describe(<span class="hljs-string">'AppComponent'</span>, () =&gt; {
  <span class="hljs-comment">// ...</span>
  <mark>it.only</mark>(<span class="hljs-string">'updates the title'</span>, () =&gt; {
        <span class="hljs-comment">// ...</span>
  })
})
</code></pre>

<p class="fragment">💡 <code><mark>describe.only</mark></code> existe également</p>

----

<pre><code class="javascript hljs"><span class="hljs-comment">// ...</span>
describe(<span class="hljs-string">'AppComponent'</span>, () =&gt; {
  <span class="hljs-comment">// ...</span>
  it(<span class="hljs-string">'updates the title'</span>, () =&gt; {
    <mark><span class="hljs-keyword">const</span> fixture = TestBed.createComponent(AppComponent);</mark>
  })
})
</code></pre>

<img src="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_2aaeeab7acd8c8daeb29505ffb6db89e.png" alt="Cargo cult" id="cargo-cult">

----

<pre><code class="javascript hljs"><span class="hljs-comment">// ...</span>
describe(<span class="hljs-string">'AppComponent'</span>, () =&gt; {
  <span class="hljs-comment">// ...</span>
  it(<span class="hljs-string">'updates the title'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> fixture = TestBed.createComponent(AppComponent);

    <mark><span class="hljs-keyword">const</span> input = fixture.nativeElement.
          querySelector(<span class="hljs-string">'input'</span>);</mark>
    <span class="hljs-comment">// ...</span>
  })
})
</code></pre>

----

# ... Wait wat ?

![](https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_e7039a60a46f4d52f4c9771e186a9527.png)


----

<pre><code class="javascript hljs">
  it(<span class="hljs-string">'updates the title'</span>, () =&gt; {
      <span class="hljs-keyword">const</span> fixture = TestBed.createComponent(AppComponent);

      <mark>debugger;</mark>
      <span class="hljs-comment">// ...</span>
  })
</code></pre>

<ul>
    <li class="fragment"><code><mark>fixture</mark></code></li>
    <li class="fragment"><code>fixture.<mark>nativeElement</mark></code></li>
    <li class="fragment">... est un élément DOM</li>
    <li class="fragment">... Donc <img src="https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png" class="inline logo" alt="logo MDN"> <a href= "https://developer.mozilla.org/en-US/search?q=querySelector">MDN</a> est votre ami</li>
</ul>

----

<pre><code>
  it(<span class="hljs-string">'updates the title'</span>, () =&gt; {
      <span class="hljs-keyword">const</span> fixture = TestBed.createComponent(AppComponent);

      <span class="fragment"><span class="hljs-keyword">const</span> input = fixture.nativeElement.
          querySelector(<span class="hljs-string">'input'</span>);</span>

<mark class="fragment">
      input.value = <span class="hljs-string">'World'</span>;
      input.dispatchEvent(<span class="hljs-keyword">new</span> Event(<span class="hljs-string">'input'</span>));
</mark>
      <span class="hljs-comment">// ...</span>
})
</code></pre>


Note:
Le fait que nous utilisons les API MDN rend la compatibilité des tests sous IE / Edge nettement plus... hasardeuse ? À vrai dire je n'en sais rien, nous sommes quand même en 2019.

----

<pre><code class="javascript hljs">  it(<span class="hljs-string">'updates the title'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> fixture = TestBed.createComponent(AppComponent);

    <span class="hljs-keyword">const</span> input = fixture.nativeElement.
          querySelector(<span class="hljs-string">'input'</span>) <span class="hljs-keyword">as</span> HTMLInputElement;
    input.value = <span class="hljs-string">'World'</span>;
    input.dispatchEvent(<span class="hljs-keyword">new</span> Event(<span class="hljs-string">'input'</span>));

    <span class="hljs-comment">// ...</span>

    <mark>expect</mark>(fixture.nativeElement.
           querySelector(<span class="hljs-string">'h1'</span>).textContent).<mark>toContain</mark>(<span class="hljs-string">'World'</span>);
  })
</code></pre>

<code><mark>expect</mark></code>, <code><mark>toContain</mark></code> ← moar [Jasmine](https://jasmine.github.io/) ![Jasmine logo](https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_0875a6880fd79a26b5a02af4117901da.png) <!-- .element: class="inline logo" -->

----

<pre>
<code class="javascript hljs" id="protractor-derniere-etape">
      <mark>// ...</mark>    // ???

</code></pre>

----

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_99c5817047ffe771e0f5e77abb863de1.png" -->

<pre>
<code class="javascript hljs" id="protractor-derniere-etape">
      <mark>fixture.detectChanges();</mark>

</code></pre>

----

# Pour finir...

## [go/workshop-angular-exercices](https://go.epfl.ch/workshop-angular-exercices)<!-- .element: class="fragment" -->

```javascript
// ...
describe('AppComponent', () => {
  // ...
  it('updates the title', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const input = fixture.nativeElement.
          querySelector('input') as HTMLInputElement;
    input.value = 'World';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(fixture.nativeElement.
           querySelector('h1').textContent).toContain('World');
  })
})
```

---

# Fin de l'étape

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_54fa49c79b3f08f63619024439f006f5.png" -->

- <img src="https://angular.io/generated/images/marketing/concept-icons/protractor.svg" alt="logo Protractor" class="inline logo"> Protractor
- <img src="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_0875a6880fd79a26b5a02af4117901da.png" alt="logo Jasmine" class="inline logo"> Jasmine et le BDD
- <img src="https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png" class="inline logo" alt="logo MDN"> L'API du DOM selon Mozilla
- <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" alt="logo Angular" class="inline logo">Le mécanisme¹ de détection des changements

<p class="fragment">¹ Ou plus précisément, son absence</p>

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
    .reveal code mark {
        font-weight: bold;
        background-color: yellow;
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
  .reveal [data-opacity="over9k"] > div {
    background-color: #fffffff0;
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
  .reveal [data-slide-id="home"] p, .reveal [data-slide-id="home"] img {
      margin: unset;
  }
  .reveal [data-slide-id="home"] img {
      max-width: 30%;
  }
  .reveal .huge.fragment {
    font-size: 400%;
    padding-bottom: 0.5em;
  }
  .reveal .huge.fragment code {
    background-color: white;
  }
  #cargo-cult {
    max-width: 60%;
  }
  #protractor-derniere-etape {
     font-size: 200%;
  }
</style>
