const About = () => {
  return (
    <div className="row fs-4 px-4">
      <h1>О нашей компании</h1>
      <p>Наша компания - это команда профессионалов, которые специализируются на создании уникальных и качественных
        продуктов. Мы занимаемся разработкой веб-сайтов, мобильных приложений и других цифровых продуктов для клиентов
        по всему миру.</p>
      <h2>Meet the Team</h2>
      <div className="team-member mb-5">
        <div className="col-8 m-0 mx-auto mb-3">
          <img src="https://freepngclipart.com/download/business/18745-business-images-images-transparent-image.png"
               alt="Team Members" className="w-100"/>
        </div>
        <p>Мы стремимся к качеству и инновациям во всем, что делаем. Наша цель - помочь нашим клиентам достичь успеха в
          цифровом мире, предоставляя им современные и функциональные решения.</p>
      </div>
      <div className="team-member">
        <div className="col-8 m-0 mx-auto mb-3">
          <img
            className="w-100"
            src="https://www.seekpng.com/png/full/176-1766791_professional-people-silhouette-entrepreneurship-black-and-white.png"
            alt="Team Members"/>
        </div>
        <p>Мы гордимся нашей командой профессионалов, которые обладают многолетним опытом и уникальными навыками в
          различных областях. Мы стремимся к совершенству в каждом проекте, который мы делаем, и всегда готовы принять
          новые вызовы.
        </p>
        <p>Мы готовы воплотить в жизнь любую вашу идею и помочь вам добиться успеха в онлайн-пространстве. Обратитесь к
          нам сегодня и узнайте, как мы можем помочь вам достичь ваших целей!
        </p>
      </div>
    </div>
  )
    ;
};

export default About;