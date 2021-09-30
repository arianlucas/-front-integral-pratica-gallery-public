import { useState } from "react";

function Imagens(props) {
  return (
    <div className="imagens">
      <img
        className={"item__like " + props.hidden}
        src="./assets/like.svg"
        alt="Like"
      />
      <img
        src={props.src}
        alt={props.alt}
        id={props.id}
        className="imgs"
        onClick={props.click}
      />
      <div className="legendas">
        <span className="descricao">Lorem ipsum</span>
        <span className="tempo">há 1 mês</span>
      </div>
    </div>
  );
}

function App() {
  const [galeria] = useState([
    {
      id: 1,
      src: "assets/gallery/image 1.png",
      alt: "Hamster",
      liked: false,
    },
    {
      id: 2,
      src: "assets/gallery/image 2.png",
      alt: "Gato",
      liked: false,
    },
    {
      id: 3,
      src: "assets/gallery/image 3.png",
      alt: "Cachorro",
      liked: false,
    },
    {
      id: 4,
      src: "assets/gallery/image 4.png",
      alt: "Gorila",
      liked: false,
    },
    {
      id: 5,
      src: "assets/gallery/image 5.png",
      alt: "Borboleta",
      liked: false,
    },
    {
      id: 6,
      src: "assets/gallery/image 6.png",
      alt: "Onça",
      liked: false,
    },
    {
      id: 7,
      src: "assets/gallery/image 7.png",
      alt: "Raposa",
      liked: false,
    },
    {
      id: 8,
      src: "assets/gallery/image 8.png",
      alt: "Lobo",
      liked: false,
    },
    {
      id: 9,
      src: "assets/gallery/image 9.png",
      alt: "Tartaruga",
      liked: false,
    },
    {
      id: 10,
      src: "assets/gallery/image 10.png",
      alt: "Leão",
      liked: false,
    },
  ]);
  const [esconder, setEsconder] = useState("hidden");
  const [modal, setModal] = useState("hidden");
  const [imgModal, setImgModal] = useState("");
  const [idModal, setIdModal] = useState();
  const [altModal, setAltModal] = useState("");
  const [esconderLike, setEsconderLike] = useState("hidden");
  let menuFechar =
    esconder === "hidden"
      ? "./assets/closed-menu.svg"
      : "./assets/open-menu.svg";
  const prev = Number(idModal) === galeria[0].id ? "hidden" : "prev";
  const next =
    Number(idModal) === galeria[galeria.length - 1].id ? "hidden" : "next";

  function handleAbrirMenu() {
    setEsconder(esconder === "hidden" ? "visible" : "hidden");
  }

  function handleModal(id) {
    if (id !== Number(id)) {
      setModal(modal === "hidden" ? "visible" : "hidden");
      return;
    }

    const imgcurtida = galeria.find((i) => i.id === Number(id));
    setIdModal(imgcurtida.id);
    setImgModal(imgcurtida.src);
    setAltModal(imgcurtida.alt);
    setModal(modal === "hidden" ? "visible" : "hidden");

    if (imgcurtida) {
      setEsconderLike(!imgcurtida.liked ? "hidden" : "visible");
    }
  }

  function handleLike() {
    const imgcurtida = galeria.find((i) => i.id === Number(idModal));
    imgcurtida.liked = !imgcurtida.liked;
    setEsconderLike(!imgcurtida.liked ? "hidden" : "visible");
  }

  function handlePropag(event) {
    event.stopPropagation();
  }

  function handlePrev() {
    const imgPrev = galeria.find((i) => i.id === idModal - 1);
    setIdModal(imgPrev.id);
    setImgModal(imgPrev.src);
    setAltModal(imgPrev.alt);
    if (imgPrev) {
      setEsconderLike(!imgPrev.liked ? "hidden" : "visible");
    }
  }

  function handleNext() {
    const imgNext = galeria.find((i) => i.id === idModal + 1);
    setIdModal(imgNext.id);
    setImgModal(imgNext.src);
    setAltModal(imgNext.alt);
    if (imgNext) {
      setEsconderLike(!imgNext.liked ? "hidden" : "visible");
    }
  }

  return (
    <div className="App roboto">
      <nav className="menu-side flex-column">
        <button className="menu-buttons bt-menu" onClick={handleAbrirMenu}>
          <img src={menuFechar} alt="Abrir/Fechar Menu" />
        </button>

        <button className="menu-buttons">
          <img src="./assets/active-home.svg" alt="Home" />
          <span className={esconder}>Inicio</span>
        </button>

        <button className="menu-buttons">
          <img src="./assets/inactive-like.svg" alt="Favorites" />
          <span className={`blackcolor ${esconder}`}>Favoritos</span>
        </button>

        <button className="menu-buttons final">
          <img src="./assets/inactive-settings.svg" alt="Settings" />
          <span className={`blackcolor ${esconder}`}>Configurações</span>
        </button>
      </nav>

      <div className="main">
        <h1>Início</h1>

        <div className="gallery flex-wrap">
          {galeria.map((imagens) => {
            return (
              <Imagens
                key={imagens.id}
                hidden={!imagens.liked ? "hidden" : "visible"}
                src={imagens.src}
                alt={imagens.alt}
                id={imagens.id}
                click={() => handleModal(imagens.id)}
              ></Imagens>
            );
          })}
        </div>
      </div>

      <div className={"modal " + modal} onClick={() => handleModal()}>
        <button className="prev" onClick={handlePropag}>
          <img
            src="./assets/prev.svg"
            alt="Imagem Anterior"
            className={prev}
            onClick={handlePrev}
          />
        </button>

        <div target="_blank">
          <img
            className={"modal__like " + esconderLike}
            src="./assets/like.svg"
            alt="Like"
          />
          <img
            className="modal_img"
            src={imgModal}
            alt={altModal}
            id={idModal}
            onClick={handlePropag}
            onDoubleClick={handleLike}
          />
        </div>

        <button className="next" onClick={handlePropag}>
          <img
            src="./assets/next.svg"
            alt="Imagem Posterior"
            className={next}
            onClick={handleNext}
          />
        </button>

        <button className="fechar-modal" onClick={() => handleModal()}>
          <img src="./assets/close-modal.svg" alt="Fechar Imagem" />
        </button>
      </div>
    </div>
  );
}

export default App;
