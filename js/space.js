document.getElementById("btnBuscar").addEventListener("click", function () {
    const query = document.getElementById("inputBuscar").value.trim();
    if (query === "") {
      alert("Por favor ingresa un término de búsqueda.");
      return;
    }
  
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const contenedor = document.getElementById("contenedor");
        contenedor.innerHTML = ""; // Limpiar el contenedor antes de mostrar nuevos resultados
  
        const items = data.collection.items;
  
        if (items.length === 0) {
          contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
          return;
        }
  
        items.forEach((item) => {
          // Desestructurar los datos del array y objetos
          const { data: [info], links } = item;
  
          if (!info || !links) return; // Filtrar resultados sin datos o sin imágenes
  
          const { title, description, date_created } = info;
          const imageUrl = links[0].href;
  
          // Crear la tarjeta usando Bootstrap
          const card = document.createElement("div");
          card.classList.add("col-md-4", "mb-4"); // Columna de Bootstrap para 3 por fila
  
          card.innerHTML = `
            <div class="card h-100">
              <img src="${imageUrl}" class="card-img-top" alt="${title}">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description ? description.substring(0, 100) + '...' : 'No hay descripción disponible.'}</p>
                <p class="text-muted">${new Date(date_created).toLocaleDateString()}</p>
              </div>
            </div>
          `;
  
          contenedor.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        alert("Hubo un problema al obtener los datos. Inténtalo más tarde.");
      });
  });
  