/*27) Programa una clase llamada Pelicula.

La clase recibirá un objeto al momento de instanciarse con los siguentes datos: id de la película en IMDB, titulo, director, año de estreno, país o países de origen, géneros y calificación en IMBD.
  - Todos los datos del objeto son obligatorios.
  - Valida que el id IMDB tenga 9 caracteres, los primeros 2 sean letras y los 
     7 restantes números.
  - Valida que el título no rebase los 100 caracteres.
  - Valida que el director no rebase los 50 caracteres.
  - Valida que el año de estreno sea un número entero de 4 dígitos.
  - Valida que el país o paises sea introducidos en forma de arreglo.
  - Valida que los géneros sean introducidos en forma de arreglo.
  - Valida que los géneros introducidos esten dentro de los géneros 
     aceptados*.
  - Crea un método estático que devuelva los géneros aceptados*.
  - Valida que la calificación sea un número entre 0 y 10 pudiendo ser 
    decimal de una posición.
  - Crea un método que devuelva toda la ficha técnica de la película.

* Géneros Aceptados: Action, Adult, Adventure, Animation, Biography, Comedy, Crime, Documentary ,Drama, Family, Fantasy, Film Noir, Game-Show, History, Horror, Musical, Music, Mystery, News, Reality-TV, Romance, Sci-Fi, Short, Sport, Talk-Show, Thriller, War, Western.*/


class Movie {
  constructor({id, title, director, year, country, gender, calification}){
    this.id = id;
    this.title = title;
    this.director = director;
    this.year = year;
    this.country = country;
    this.gender = gender;
    this.calification = calification;

    this.validateIMDB(id);
    this.validateTitle(title);
    this.validateDirector(director);
    this.validateYear(year);
    this.validateCountry(country);
    this.validateGender(gender);
    this.validateCalification(calification);

  }

  static get genderList(){
    return ["Action", "Adult", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary" ,"Drama", "Family", "Fantasy", "Film Noir", "Game-Show", "History", "Horror", "Musical", "Music", "Mystery", "News", "Reality-TV", "Romance", "Sci-Fi", "Short", "Sport", "Talk-Show", "Thriller", "War", "Western"]
  }

  static genderAccepted(){
    return console.log(`Los generos aceptados son: ${Movie.genderList.join(", ")}`)
  }

  validateString(property, value){
    if(!value) return console.warn(`${property} "${value}" esta vacio.`);
    if(typeof value !== 'string') return console.error(`${property} "${value}" no es una cadena de texto.`);

    return true;
  }

  validateStringLength(property, value, length){
    if(value.length > length) return console.warn(`La propiedad: ${property}\nSu propiedad tiene ${value.length}`)
    return true
  }

  validateNumber(property, value){
    if(!value) return console.warn(`${property} "${value}" está vacio.`);
    if(typeof value !== 'number') return console.error(`${property} "${value}" no es un número.`);
    return true
  }

  validateArray(property, value){
    if(!value) return console.warn(`${property} "${value}" se encuentra vacio.`);
    if(!(value instanceof Array)) return console.error(`${property} "${value}" debe estar definido como arreglo`);
    if(value.length === 0) return console.warn(`${property} "${value}" no debe estar vacio.`)
    for(let notString of value){
      if(typeof notString !== 'string') return console.error(`El valor ${notString} no es una cadena de texto`);
    }

    return true
  }

  


  //generics
  validateIMDB(id){
    if(this.validateString('IMDB id', id))
    if(!(/^([a-z]){2}([0-9]){7}$/.test(id)))
    return console.error(`IMDB id ${id} no es valido, debe estar compuesto por 2 letras minúsculas y 7 números.`);
    
  }

  validateTitle(title){
    if(this.validateString('Title', title))
    this.validateStringLength('Title', title, 100)

  }

  validateDirector(director){
    if(this.validateString('Director', director))
    this.validateStringLength('Director', director, 50)
  }

  validateYear(year){
    if(this.validateNumber('Año de estreno', year))
    if(!(/^([0-9]){4}$/.test(year)))
    return console.error(`Año de estreno ${year} no es válido, debe tener 4 números. `)
  }

  validateCountry(country){
    this.validateArray("Pais", country)
  }

  validateGender(gender){
    if(this.validateArray('Género', gender)){
      for(let oneGender of gender){
        if(!Movie.genderList.includes(oneGender)){
          console.error(`Género incorrecto: ${gender.join(' - ')}`);
          Movie.genderAccepted();
        }
      }
    }
  }

  validateCalification(calification){
    if(this.validateNumber('Calificación', calification))
      (calification < 0 || calification > 10)
      ? console.warn('La calificación tiene un rango entre 1 y 10') 
      : this.calification = calification.toFixed(1);  
  }

  dataSheet(){
    console.info(`FICHA TÉCNICA:\nTitulo: ${this.title}\nIMDB ID: ${this.id}\nDirector: ${this.director}\nAño de esreno: ${this.year}\nPais: ${this.country.join(' - ')}\nGénero: ${this.gender.join(' - ')}\nCalificación: ${this.calification}`);
  }
}

const movieCreed = new Movie({
  id : 'tt1234567',
  title: 'Creed',
  director: 'Ryan Coogler',
  year: 2015,
  country: ['USA', 'Canadá'],
  gender: ['Drama', 'Sport'],
  calification: 9.455

 })


 movieCreed.dataSheet();


