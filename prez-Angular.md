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


| Si vous aimez...      | vous aimerez...                           |
| --------------------- | ----------------------------------------- |
| ☁️ les nuages ☁️      | [stackblitz.com](https://stackblitz.com/) |
| Votre laptop          | [node.js](https://nodejs.org/en/download/package-manager/) + [cli.angular.io](https://cli.angular.io/) |
| Emacs                 | `M-x package-install` ⏎ <br/> `tide` ⏎    |
| ... vous ne savez pas | Essayez <img alt="logo Visual Studio Code" src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" class="inline logo"> [Visual Studio Code](https://code.visualstudio.com/download)                                         |


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

# Tests avec <br/>![Karma logo](https://pascalprecht.github.io/full-spectrum-testing-slides/styles/karma-logo.svg)<!-- .element: class="logo" -->

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_1b693cd34f87fd89f8f7373cc4b62e12.png" -->

<p class="huge fragment"><code>ng test</code> <img src="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/cloud-forbidden.svg?sanitize=true" alt="Interdit aux nuages" id="interdit-aux-nuages" class="inline logo fragment"></p>

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
  <mark>fit</mark>(<span class="hljs-string">'updates the title'</span>, () =&gt; {
        <span class="hljs-comment">// ...</span>
  })
})
</code></pre>

<p class="fragment">💡 <code><mark>fdescribe</mark></code> existe également (<code><mark>f</mark></code> comme <a href="https://jasmine.github.io/api/3.5/global.html#fdescribe">“focused”</a>)</p>

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
<code class="javascript hljs" id="karma-derniere-etape">
      <mark>// ...</mark>    // ???

</code></pre>

----

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_99c5817047ffe771e0f5e77abb863de1.png" -->

<pre>
<code class="javascript hljs" id="karma-derniere-etape-2">
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

- <img src="https://cdn.worldvectorlogo.com/logos/karma.svg" alt="logo Karma" class="inline logo">  Karma
- <img src="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_0875a6880fd79a26b5a02af4117901da.png" alt="logo Jasmine" class="inline logo"> Jasmine et le BDD
- <img src="https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png" class="inline logo" alt="logo MDN"> L'API du DOM selon Mozilla
- <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" alt="logo Angular" class="inline logo">Le mécanisme¹ de détection des changements

<p class="fragment">¹ Ou plus précisément, son absence</p>

---

# Quelques derniers conseils...

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/Minerva-McGonagall-Wallpaper-hogwarts-professors-32797113-1024-768.jpg" -->



- **Peaufinez vos recherches sur Google** ("2019", "Angular 7", "Angular 8")

----

# Quelques derniers conseils...

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/Minerva-McGonagall-Wallpaper-hogwarts-professors-32797113-1024-768.jpg" -->


- **Ne vous éloignez pas trop des sentiers battus !** Votre app risquerait (par exemple) [de ne plus compiler en prod'](https://github.com/angular/angular/issues/13590)
- Malgré cela, **attendez-vous à des changements incompatibles** (ex : adoption de `async` / `await` et Puppeteer pour les tests unitaires)

<!--
  If you want/need a resizable background image, add the background-size: cover; property and change background-position: 0px 0px;
-->

---

# Exercice 4 : chercher-en-tapant

<ul>
    <li class="fragment">Test-first¹</li>
    <li class="fragment"><img alt="logo RxJS" src="https://rxjs-dev.firebaseapp.com/generated/images/marketing/home/Rx_Logo-512-512.png" class="inline logo"> RxJS</li>
</ul>

----

# Exercice 4

[stackblitz.com/edit/epfl-angular-exercice4-jquery](https://stackblitz.com/edit/epfl-angular-exercice4-jquery)

----

# Exercice 4

<img alt="Logs d'arrivée des réponses dans le désordre" src="/uploads/upload_4b1e2e9d198f7018bfc3476ce185b066.png" id="logs-jquery-desordre">

... Ça ne marche pas très bien

----

# Exercice 4

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_b38137721942f75cda5bbfa8aa78c862.jpg" -->


<ol>
    <li class="fragment"><pre>
ng new --defaults --no-routing search-as-you-type
cd search-as-you-type
<mark>ng test</mark>
</pre></li>
    <li class="fragment"><pre>ng generate component search-as-you-type
<mark>ng test</mark>
</pre>
        <p class="fragment">
        💡 <code>ng create</code> change les dépendances, il faut donc stopper/redémarrer les tests en continu (commande <code>ng test</code>).
        </p>
    </li>
</ol>

----

# Exercice 4 : révisions

Faisons une mini-app pour les tests manuels&nbsp;:

1. Tout effacer dans `src/app/app.component.html`; remplacer par <pre>&lt;app-search-as-you-type&gt;&lt;/app-search-as-you-type&gt;</pre>
1. `ng serve` @ http://localhost:4200/
1. `ng test` : revenir à la barre verte ([solution](https://github.com/epfl-si/formation-angular.search-as-you-type/commit/011fe67a12a8412b6d34e49e955dfa8a1f10c202))

----

# Exercice 4 : diviser pour régner

- <!-- .element: class="fragment" --> Une «coquille» graphique
    - Fournit : les mots-clefs de recherche
    - Reçoit : les résultats
- <!-- .element: class="fragment" --> Un <b>service</b> de recherche
- <!-- .element: class="fragment" --> La tuyauterie pour les relier : <img src="https://cdn.worldvectorlogo.com/logos/rxjs-1.svg" class="inline logo"> RxJS

----

# Coquille graphique

![](/uploads/upload_20ec5d52fdf8937e54640581aed82c31.png)

----

# Test ~~first~~ second

... À ce stade de notre apprentissage, commençons par un test manuel, et voyons en second lieu comment l'automatiser.


<pre class="fragment">
&lt;input type="text" #searchterm
    (keyup)="search(searchterm.value)"&gt;
</pre>

<a class="fragment" href="https://github.com/epfl-si/formation-angular.search-as-you-type/commit/790b6b9f50c34c086c1af12eb697cd6041c0fec4">Suite et fin</a>

----

# Test second

<img src="https://pbs.twimg.com/profile_images/1206579384762679299/hbixlO64_400x400.jpg" style="float: right;">

- <!-- .element: class="fragment" --> <a href="https://angular.io/guide/testing">angular.io/guide/testing</a>
- <!-- .element: class="fragment" --> ... et Google
- <!-- .element: class="fragment" --> <code>By.css(...)</code>
- <!-- .element: class="fragment" --> <code>.triggerEventHandler()</code> <br> (<a href="https://netbasal.com/simulating-events-in-angular-unit-tests-5482618cd6c6#c5ef">exemple</a>)
- <!-- .element: class="fragment" --> <a href="https://jasmine.github.io/api/3.5/global.html#spyOn"><code>spyOn</code></a> (<a href="https://stackoverflow.com/a/46818801/435004">exemple</a>)


----

# Test second

[Solution](https://github.com/epfl-si/formation-angular.search-as-you-type/commit/185840ca661a89c0753ee4c64975cc3f39b17b18)


----

# Test pas ~~du tout~~ maintenant

<pre>
it("shows results");
</pre>

---

# RxJS

```javascript
  search(value: string) {
    console.log(value);  // TODO: peut mieux faire.
  }
```

----

# RxJS et les `Observable`s

... et les `Subject`s

```javascript
import { Subject } from 'rxjs';
// ...
  private searchString = new Subject<string>();

// ...
  search(value: string) {
    this.searchString.next(value);
  }
```

![Marble diagram](/uploads/upload_7d708dd506c591285a2321d15a63f375.png)


----

# RxJS et les `Subscriptions`

```javascript
export class SearchAsYouTypeComponent implements OnInit {
  // ...
  ngOnInit() {
    this.searchString.subscribe(console.log);
  }

}
```

----

# RxJS et les fuites de mémoire

```javascript
import { debounceTime, tap } from 'rxjs/operators';
// ...

export class SearchAsYouTypeComponent implements OnInit {
  // ... 

  private searchString = new Subject<string>();
  searchStringDebounced = searchString.pipe(
      debounceTime(400),
      tap(console.log)
  );
}
```

----

# RxJS : au-delà de `console.log`

<pre>.pipe()</pre>

----

```javascript
import { tap, debounceTime,
         distinctUntilChanged } from 'rxjs/operators';

export class SearchAsYouTypeComponent implements OnInit {
  searchStringDebounced = this.searchString.pipe(
    debounceTime(400),
    distinctUntilChanged(),
    tap(console.log)
  );
}
```

🚑 [Le diff](https://github.com/epfl-si/formation-angular.search-as-you-type/compare/284224a..825aece)

----

<!-- .slide: data-background="https://nmamfqlmsh.files.wordpress.com/2013/09/1362724811_shutterstock_12893383.jpg" -->
... Plus rien.

**Les `Observable`s sont paresseux.** Tant qu'on n'y `.subscribe()` pas, ils ne font rien.

----

```
&lt;p&gt;Current search term:&lt;/p&gt;
&lt;pre&gt;{{searchStringDebounced | async }}&lt;/pre&gt;
```

<img src="https://threadbombing.com/data/media/4/its_magic.jpg" style="float: right;">

<code> | async </code> rend la dernière valeur d'un `Observable`, n'a pas besoin d'être importé, et est auto-unsubscribe.

----

# Exercice 4 : l'exercice

Implémenter le search-as-you-type et présenter votre approche.

- Ne pas s'attarder sur la présentation des résultats (`console.log()` ou bien `<pre>{{ searchResults | async | json}}</pre>`)
- Rappel : [la version jQuery](https://stackblitz.com/edit/epfl-angular-exercice4-jquery) contient une fonction `searchEPFL()` prête à copier-coller.

----

# L'approche RxJS

<!-- .slide: data-background="https://i.pinimg.com/736x/cf/de/83/cfde83db2b3b0cca907bfa6aaf142618.jpg" -->

Avec l'opérateur `switchMap` ([démo sur rxmarbles.com](https://rxmarbles.com/#switchMap)), on peut
  - créer un nouvel `Observable` pour chaque valeur de l'`Observable` «parent»;
  - fusionner les valeurs.

💡 La fonction «switchMappée» peut renvoyer une `Promise` à la place d'un `Observable`.

Note: Ce n'est pas la solution parfaite pour l'instant.

----

# L'approche RxJS

<!-- .slide: data-background="https://i.pinimg.com/736x/cf/de/83/cfde83db2b3b0cca907bfa6aaf142618.jpg" -->

<img src="https://angular-academy.s3.amazonaws.com/angular-university-logo-and-letters.png" style="float: left; max-width: 30%;">

En savoir plus sur `switchMap` et son utilité pour le search-as-you-type : [blog.angular-university.io/rxjs-higher-order-mapping/ (§ “Search TypeAhead”)](https://blog.angular-university.io/rxjs-higher-order-mapping/#searchtypeaheadswitchmapoperatorexample)

<div style="clear: both;"></div>

----

# L'approche RxJS

[Corrigé](https://github.com/epfl-si/formation-angular.search-as-you-type/commit/26c06f687e712d7249f46a52e81afcc0b189956e)

----

# Fin de l'étape

<!-- .slide: data-background="https://www.ebarchitects.eu/blog/wp-content/uploads/2016/02/edvard-munch.jpg" -->

- RxJS : `Observable`s, opérateurs, `Observable`s d'`Observable`s
- *Functional reactive programming*
- Mieux que ~~les Promises~~ rien (jQuery et asynchronie incontrôlée)
- Beaucoup de progrès à faire
    - Rendu des résultats
    - Limitation / annulation des requêtes
    - Couverture de tests

---

# Chercher-en-tapant : on améliore

Au cours de cette partie,
- nous explorerons l'API HTTP d'Angular, qui propose des requêtes annulables
- nous verrons comment séparer (et tester séparément) le code «graphique» et le client de l'API


----

# Injection de dépendances

```javascript
constructor(private http : HttpClient) {}
```

<img class="fragment" src="https://media.tenor.com/images/5bcb5056e6dfe7f757018ecaa8a4b868/tenor.gif" style="float: right;">

----

# Exercice 5

Réécrire la fonction `searchEPFL(q)` en termes de `@angular/common/http`.

→ [blog.angular-university.io/angular-http](https://blog.angular-university.io/angular-http/)

----

# Exercice 5

<a href="https://github.com/epfl-si/formation-angular.search-as-you-type/commit/4425021">Solution</a>

<table class="fragment">
 <tr><th>⊕</th><th>⊖</th></tr>
    <tr>
        <td><ul><li>Meilleur style</li><li>Les requêtes sont à présent annulables</li></ul></td>
        <td>Les tests sont cassés <span class="fragment">(<a href="https://github.com/epfl-si/formation-angular.search-as-you-type/commit/f214a28">solution</a>)</span></td></tr>
</table>

----

# Fin d'étape

<!-- .slide: data-background="https://stackify.com/wp-content/uploads/2018/06/Design-Patterns-Explained-–-Dependency-Injection-with-Code-Examples.png" -->

Du point de vue du **consommateur**, l'injection de dépendances

- fournit automagiquement des singletons à tout endroit de la hiérarchie des composants,
- permet d'utiliser des instances séparées pour le test et la production (⇒ **tests hermétiques**)

----

# Pour aller plus loin...

<!-- .slide: data-background="https://news.wisc.edu/content/uploads/2016/07/Sloth-2.jpg" -->

- <!-- .element: class="fragment" --> Couverture de tests
  - <!-- .element: class="fragment" --> Erreurs côté serveur (500 / timeouts) — <a href="https://medium.com/netscape/testing-with-the-angular-httpclient-api-648203820712#0dae">Mocking avec <code>HttpTestingController</code></a>
  - <!-- .element: class="fragment" --> Refactorer pour extraire le pipe-line comme un <a href="https://medium.com/javascript-everyday/a-live-search-example-angular-and-react-solutions-bd42a4d5dd7e">nouvel opérateur RxJS</a>, et le mettre sous tests (“marble testing”)
- <!-- .element: class="fragment" --> Injection de dépendances en tant que <b>producteur</b> (ex : <code>I18NService</code>)

Note:
- Sujets potentiellement intéressants pour la journée 3


---

# Le décor

<!-- .slide: data-background="https://raw.githubusercontent.com/epfl-idevfsd/hackmd.angularjs/master/uploads/upload_4378e695ea32dbb93e534972df595195.jpg" -->

<ul>
    <li class="fragment"><a href="https://ng-select.github.io/ng-select#/data-sources"><img src="https://img.stackshare.io/service/7488/select2.png" alt="logo Select2" class="inline logo"> ng-select</a></li>
    <li class="fragment"><a href="https://ng-bootstrap.github.io/"><img src="https://ng-bootstrap.github.io/img/logo-stack.png" alt="logo ng-bootstrap" class="inline logo"> ng-bootstrap</a></li>
</ul>


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
    #interdit-aux-nuages {
        vertical-align: text-bottom;
        max-width: 200pt;
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
    #karma-derniere-etape {
        font-size: 200%;
    }
    #logs-jquery-desordre {
        max-width: 50%;
    }
</style>
