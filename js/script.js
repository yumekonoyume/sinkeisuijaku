    const start = document.getElementById("start");
    const cards = document.querySelectorAll(".material-symbols-outlined");
    let selected = '';
    let player = 'one';
    let lock = false;  //falseならめくれる、trueならめくれない
    let interval = 1000;

    //カード
    cards.forEach((card) => {
      card.onclick = () => {
        if (lock || !card.classList.contains('hidden')) {
          return;
        }

        card.classList.remove('hidden');
        card.classList.add("selected");
        interval = 2000;

        // 1枚目のカードをめくったとき
        if (selected == '') {
          selected = card.innerHTML;
          interval = 1000;

          // 1枚目と2枚目が一致したら
        } else if (card.innerHTML == selected) {
          nextTurn(player);   //nextTurn関数を呼び出し、引数にplayerを入れる

          // カードが不一致だったら
        } else {
          //lockをtrueにして、プレイヤー交代。setTimeout関数で1秒後にfalseに戻す。
          lock = true;
          if (player == 'one') {
            player = 'two';
          } else {
            player = 'one';
          }

          //setTimeout() メソッド: 時間切れになると関数または指定されたコードの断片を実行するタイマーを設定
          setTimeout(() => {
            nextTurn('hidden');  //選択中のカードやペアがそろったカードをクリックしても反応しなくなる
            lock = false;
          }, 1000);
        }

        //　プレイヤーtwoは自動でクリックベントを発動する
        if (player == 'two') {
          setTimeout(() => {
            const clickables = document.querySelectorAll('.hidden');
            const i = Math.floor(Math.random() * clickables.length);
            clickables[i].click();
          }, interval);
        }

      };
    });

    //2枚めくった後の処理を関数にして切り分けておく
    //付与するクラスは引数addで設定し、呼び出し時にhiddenが渡される
    //カードが一致したときも選択状態を解除する必要がある
    const nextTurn = (add) => {
      selected = "";             //1枚もめくられていない状態に戻す
      let selections = document.querySelectorAll(".selected");

      selections.forEach((card) => {
        card.classList.add(add);
        card.classList.remove("selected");
      });
    };

    //スタートをクリックしたらすべてのカードを裏に戻しシャッフル
    start.onclick = () => {
    let container = document.getElementById('container');

    cards.forEach((card) => {
        card.classList.add("hidden");
        card.classList.remove('one', 'two');

        const i = Math.floor(Math.random() * container.children.length);
        container.appendChild(container.children[i]);
    })
    }