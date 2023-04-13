const header = `<header>
  <div class="container">
    <section class="first">
      <!-- <span class="logo"> -->
      <img class="logo" src="img/logo.png" alt="">
      <!-- </span> -->
      <div class="right">

        <button href="" class="summary" data-toggle="modal" data-target="#exampleModal">Войти</button>
        <a href="" class="s-work">Зарегистрироваться</a>

      </div>
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5>Forem</h5>
              <button class="btn-close" data-dismiss="modal" aria-label='close'></button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
    </section>

  </div>
</header>`;
document.querySelector('#header').insertAdjacentHTML('beforeend', header);
