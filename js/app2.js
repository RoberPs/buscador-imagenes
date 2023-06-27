const iniciarApp = ()=>{

 
    //Variables

    const formulario = document.getElementById('formulario');
   
    const resultado= document.querySelector('#resultado');
    const paginacionDiv = document.querySelector('#paginacion')

    const registrosPorPagina = 30;
    let totalPaginas;
    let iterador;
    let paginaActual = 1;


    const validarFormulario=(e)=>{
     e.preventDefault();
     const termino = document.querySelector('input[type="text"]').value;
       
     if(termino===''){
         mostrarMensaje('Agrega un término de búsqueda valido !!')
        return;
    }
     obtenerImagenes()
     
    }  
    formulario.addEventListener('submit',validarFormulario);
    const mostrarMensaje=(mensaje)=>{
      
      const existe = document.querySelector('bg-red-100');
      
      if(!existe){
        const alerta= document.createElement('P');
        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-ld','mx-auto','mt-6','text','text-center','font-bold');
        alerta.innerHTML=mensaje;
        resultado.appendChild(alerta)
          
        setTimeout(()=>{
          
          alerta.remove();
        
        },3000)
      }

    }
    const obtenerImagenes = async(/* termino */)=>{
     
     const termino = document.querySelector('input[type="text"]').value;

     const key ='29743069-c3c157fec602d5cc274263be5';
     const url =`https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPorPagina}&page=${paginaActual}`;

     
     const respuesta = await fetch(url);
     const resultado = await respuesta.json();
     /* console.log(resultado) */
     totalPaginas = calcularPaginas(resultado.totalHits)
     /* console.log(totalPaginas) */
     mostrarResultados(resultado.hits)
    
    }
    const mostrarResultados=(imagenes)=>{
        

      limpiarAnterior(resultado)

      imagenes.forEach(imagen => {
        
          /* console.log(imagen)
           */
          const{previewURL,likes,views,largeImageURL}=imagen;
          
          const divImagen = document.createElement('div');
          divImagen.classList.add('w-1/2','md:w-1/3','lg:w-1/4','p-3','mb-4')
          divImagen.innerHTML=`
              <div class="bg-white">
                <img class="w-full" src="${previewURL}">
                <div class="p-4">
                   <p class="font-bold">${likes} <span class="font-light">Me gusta</span></p>
                   <p class="font-bold">${views} <span class="font-light">Veces vista</span></p>
                   <a class="w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                      href="${largeImageURL}" target="_blank" rel="noopener noreferrer"   
                   >Ver Imagen</a>
                </div>
              </div>          
            
            `
            resultado.appendChild(divImagen)
          });

          limpiarAnterior(paginacionDiv)
          imprimirPaginador()  
          
    }
    const calcularPaginas=(total)=>{
    
      return parseInt(Math.ceil(total/registrosPorPagina))
    
    }
    function* paginador(total){
        //Registra el total de paginas segun la busqueda
        for(let i =1;i<=total;i++){
          yield i; /* value */
        }
    }
    const imprimirPaginador=()=>{
      iterador = paginador(totalPaginas);
      //Mientra esta activo el iterador
      while(true){
        //Extraer valores y done del iterador y lo activamos
        const{value,done}=iterador.next();
           if(done){
              return;
           }
           //Caso contrario,genera un boton por cada elemento del generador
           const boton = document.createElement('a');
           boton.href='#';
           boton.dataset.pagina= value;
           boton.textContent=value;
           boton.classList.add('siguiente','bg-yellow-400','px-4','py-1','mr-2','font-bold','mb-2','rounded');
           boton.onclick=()=>{
             paginaActual= value;
             obtenerImagenes();
          }
           paginacionDiv.appendChild(boton)
          }
    }
    const limpiarAnterior =(dinamico)=>{
      while(dinamico.firstChild){  
         dinamico.removeChild(dinamico.firstChild)
      }
     
    }    
}
document.addEventListener('DOMContentLoaded',iniciarApp);