
// --- teste realizado para buscar o link da api correto ---

// function pokemonsFotos(obj) {
//     console.log(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${obj.id}.png`)
// }

function pesquisaId(nome, divs) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nome}/`)
        .then(resp => resp.json())
        .then(obj => {
            // comola a imagem do pokemon no card
            // pokemonsFotos(obj.id)
            let img = document.createElement('img');
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${obj.id}.png`;
        
            
            // acrescenta o nome do pokemon
            let nomePoke = document.createElement('p');
            nomePoke.textContent = nome;

            divs.appendChild(img);
            divs.appendChild(nomePoke);

        })
}

// document.getElementById("poke").addEventListener("click", pokemon);

function pokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=42`)
        .then(resp => resp.json())
        .then(obj => {
            document.getElementById('pokemon').innerHTML = '';

            obj.results.forEach((element) => {
                let divs = document.createElement('div');
                // divs.classList.add("card-pokemon");

                pesquisaId(element.name, divs);

                divs.addEventListener("click", () => expandirDiv(divs, element.name));

                document.getElementById('pokemon').appendChild(divs);

            });
            let ultimaDivClicada = null;
            Array.from(document.querySelectorAll("#pokemon div"))
                .forEach(div => {
                    div.addEventListener("click", evt => {
                        if (ultimaDivClicada) {
                            ultimaDivClicada.style.backgroundColor = "";
                        }

                        evt.currentTarget.style.backgroundColor = "#eb9cdd";
                        mostrarAtributos();
                        ultimaDivClicada = evt.currentTarget;
                    });
            });
        });
}

// ---- faz com que o card clicado ganhe um ID. ----
function expandirDiv(div) {
    document.querySelectorAll('#pokemon > div')
        .forEach(card => {
            card.removeAttribute("id");
        })
    div.id = "cardPoke";
}

// ---- criei a div com o id acima para utilizar nessa função como um seletor.
function mostrarAtributos() {
    // -- usei os dois let abaixo para selecionar o nome do pokemon que está dentro do elemento <p> --
    let cardPoke = document.getElementById("cardPoke");
    let nomePoke = cardPoke.querySelector("p").textContent;

    fetch(`https://pokeapi.co/api/v2/pokemon/${nomePoke}/`)
        .then(resposta => resposta.json())
        .then(data => {

            let divCard = document.getElementById('poke');
            // -- usei esse innerHTML vazio para apagar a busca do pokemon anterior --
            divCard.innerHTML = "";

            let divMostrar = document.createElement('div');
            divCard.appendChild(divMostrar);
            divMostrar.id = "mostrar";

            let img = document.createElement('img');
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
            img.style.scale = '180%';
            img.style.padding = '20px';

            let nomeP = document.createElement('p');
            nomeP.textContent = nomePoke;
            nomeP.style.fontSize = '2em';

            let id = document.createElement('p');
            id.textContent = 'Id: ' + data.id;
            id.style.fontSize = '1em';

            let skill = document.createElement('button');
            skill.textContent = 'Skills';
            skill.addEventListener('click', () => {
                botaoSkill (nomePoke);
            })
            let status = document.createElement('button');
            status.textContent = 'Status';
            status.addEventListener('click', () => {
                botaoStatus(nomePoke);
            })
            let audio = document.createElement('button');
            audio.textContent = 'Áudio';
            audio.addEventListener('click', () => {
                botaoAudio(data.id);
            })

        
            divMostrar.appendChild(img);
            divMostrar.appendChild(nomeP);
            divMostrar.appendChild(id);
            divMostrar.appendChild(skill);
            divMostrar.appendChild(status);
            divMostrar.appendChild(audio)
        }) 
}

function botaoSkill (nomePoke) {
    let divSkill = document.getElementById("poke");

    let divExistente = document.getElementById('descricao');
    if (divExistente) {
        divSkill.removeChild(divExistente);
    }

    let divM = document.createElement('div');
    divM.id = 'descricao';
    divSkill.appendChild(divM);

    fetch(`https://pokeapi.co/api/v2/pokemon/${nomePoke}/`)
        .then(resposta => resposta.json())
        .then(data => {
            
            let hp = document.createElement('p');
            hp.textContent = `HP: ${data.stats.find(stat => stat.stat.name === "hp").base_stat}`;
            
            let ataque = document.createElement('p');
            ataque.textContent = `Ataque: ${data.stats.find(stat => stat.stat.name === "attack").base_stat}`;
            
            let defesa = document.createElement('p');
            defesa.textContent = `Defesa: ${data.stats.find(stat => stat.stat.name === "defense").base_stat}`;
            
            let ataqueEspecial = document.createElement('p');
            ataqueEspecial.textContent = `Ataque Especial: ${data.stats.find(stat => stat.stat.name === "special-attack").base_stat}`;
            
            let defesaEspecial = document.createElement('p');
            defesaEspecial.textContent = `Defesa Especial: ${data.stats.find(stat => stat.stat.name === "special-defense").base_stat}`;

            let velocidade = document.createElement('p');
            velocidade.textContent = `Velocidade: ${data.stats.find(stat => stat.stat.name === "speed").base_stat}`;

            divM.appendChild(hp);
            divM.appendChild(ataque);
            divM.appendChild(defesa);
            divM.appendChild(ataqueEspecial);
            divM.appendChild(defesaEspecial);
            divM.appendChild(velocidade);
            })
}

function botaoStatus (nomePoke) {
    let divStatus = document.getElementById("poke");

    let divExistente = document.getElementById('descricao');
    if (divExistente) {
        divStatus.removeChild(divExistente);
    }

    let divM = document.createElement('div');
    divM.id = 'descricao';
    divStatus.appendChild(divM);
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${nomePoke}/`)
        .then(resposta => resposta.json())
        .then(data => {
            
            let tipo = document.createElement('p');
            tipo.textContent = `Espécie: ${data.types.map(type => type.type.name)}`;
            
            let altura = document.createElement('p');
            let alturaAPI = data.height*10
            altura.textContent = `Altura: ` + alturaAPI + ' cm';
            
            let peso = document.createElement('p');
            let pesoAPI = data.weight / 10;
            peso.textContent = `Peso: ` + pesoAPI + ' kg';
            
            let habilidade = document.createElement('p');
            habilidade.textContent = `Habilidades: ${data.abilities.map(abilities => abilities.ability.name)}`;
            
            divM.appendChild(tipo);
            divM.appendChild(altura);
            divM.appendChild(peso);
            divM.appendChild(habilidade);
            })
}

function botaoAudio (id) {

    let grito = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`);

    grito.play()
}


pokemon()








// ---- função não funcionou corretamente ----


    // let divEvolucao = document.getElementById("poke");

    // let divExistente = document.getElementById('descricao');
    // if (divExistente) {
    //     divEvolucao.removeChild(divExistente);
    // }

    // fetch(`https://pokeapi.co/api/v2/pokemon-species/${namePoke}/`)
    //     .then(resposta => resposta.json())
    //     .then(data => {
    //         fetch(data.evolution_chain.url)
    //             .then(resposta => resposta.json())
    //             .then(data => {
                    
                    
                    // let divM = document.createElement('div');
                    // divM.id = 'descricao';
                    // divEvolucao.appendChild(divM);
                                

    //                 let evolucoes = [];
    //                 let evolucaoAtual = data.chain;
                    

    //                 while (evolucaoAtual) {
    //                     evolucoes.push(evolucaoAtual.species.name);
    //                     evolucaoAtual = evolucaoAtual.evolves_to[0];
    //                 }

    //                 evolucoes.forEach(evolucao => {
    //                     let evolucaoElem = document.createElement("p");
    //                     evolucaoElem.textContent = `${evolucao}`;
    //                     divM.appendChild(evolucaoElem);
    //                 })})
    //     })




