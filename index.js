class Pokemon{
    constructor(name){
        this.name = name;
        this.type = '';
        this.profile    =  '';
        this.moves = [];
        this.power = 30;
        this.defends = 10;
        this.life  = 100;
    }

    set setType(typeName){
        if(this.#validateType(typeName.toLowerCase())) this.type = typeName.toLowerCase()
    }

    set setPowerUp(powerup){
        this.power = this.power + powerup
    }

    set setMove(move){
       if(!typeof move === 'object' ) return false

       this.moves.push(move)
    }

    set applyDamage(damage){
        if(damage === 0) return false;

        this.life = this.life - damage
    }

    attack(move){
        return this.power + move
    }

    #validateType(type){
        const typesAllowed = ['fire', 'water', 'psycho', 'normal', 'fighting', 'fly', 'rock', 'grass', 'insect', 'electric', 'ghost']
        if(typesAllowed.includes(type)) return true
        else return false
    }

}

let actions = ['attack', 'defend'];

function Battle(pokemon1, pokemon2){
    console.log('Empieza la batalla')
    PowerUpPokemon(pokemon1, pokemon2);
    
    while(pokemon1.life > 0 && pokemon2.life > 0){
        
        let actionRandom1 = actions[Math.floor(Math.random() * 2)]
        let actionRandom2 = actions[Math.floor(Math.random() * 2)]
        let damagePokemon1
        let damagePokemon2
        if(actionRandom1 === 'attack'){ damagePokemon1 = pokemon1.moves[Math.floor(Math.random() * pokemon1.moves.length)].power + pokemon1.power } 
        if(actionRandom2 === 'attack'){ damagePokemon2 = pokemon2.moves[Math.floor(Math.random() * pokemon1.moves.length)].power + pokemon2.power } 
    
        if(actionRandom1 === 'defend' && actionRandom2 === 'defend') continue
        console.log({Pokemon1: `${pokemon1.life} - ${actionRandom1}`, Pokemon2: `${pokemon2.life} - ${actionRandom2}`})

        if(actionRandom1 === 'attack' && actionRandom2 === 'defend' && (pokemon1.life > 0 && pokemon2.life > 0) ) pokemon2.applyDamage = damagePokemon1 - pokemon2.defends
        if(actionRandom2 === 'attack' && actionRandom1 === 'defend' && (pokemon1.life > 0 && pokemon2.life > 0)) pokemon1.applyDamage = damagePokemon2 - pokemon1.defends
        if(actionRandom2 === 'attack' && actionRandom1 === 'attack' ) {
            if((pokemon1.life > 0)){
                pokemon2.applyDamage = damagePokemon1
            }
            if((pokemon2.life > 0)){
                pokemon1.applyDamage = damagePokemon2
            }
        }

        if(pokemon1.life <= 0) console.log('gana 2')
        if(pokemon2.life <= 0) console.log('gana 1')
    }


}

function PowerUpPokemon(pokemon1, pokemon2){
    let type1 = pokemon1.type
    let type2 = pokemon2.type

    if(type1 === type2) return false;

    let rules = {
        'fire': 'water',
        'water': 'electric'
    }

    if(rules[type1] === type2) pokemon2.setPowerUp = 15
    else if(rules[type2] === type1) pokemon1.setPowerUp = 15
}


const Stw   =  new Pokemon('Stw');
Stw.setType = 'Electric'
Stw.setMove = {
    name: 'Punch',
    power: 20
}
const Enemy =  new Pokemon('Enemy');
Enemy.setType = 'Water'
Enemy.setMove = {
    name: 'Kick',
    power: 30
}

Battle(Stw, Enemy)