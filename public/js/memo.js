//GLOBAIS
	var cnv = document.querySelector('canvas');
	var ctx = cnv.getContext('2d');
	var pause = false;
	var contLoop = 0;
	var contImg = 0;
	var sprites = new Array();
	var jogo = new Array();
	var mapa = new Array();
	var metaWidth = 670;//tamanho da tela width
	var metaHeight = 300;//tamanho da tela
	var metaHorizontal = metaVertical = null;//mouse
	var gpsX = gpsY = null;
	var mileniunFalconLeft;
	var mileniunFalconRight;
	var iaX = iaY = iaLar = null;
	var memoSprite = gpTrampando = objSpr =  null;
//************************************************************
function start(){//carregou a pagina web...
	console.log('start iniciado...');
	//tamanho da camera
		cnv.width = metaWidth;
		cnv.height = metaHeight;
	//carregar sprites sheets do game  LOADING...........
	/*/loadSprites(   src da imagem,    colunas,    linhas,    flag,    status);//status= ('' || 'mapa')
	loadSprites('img/city.png', 1, 1, 'background', '');
		sprites[achar('background')].id = 'world';//este objeto é o mundo do jogo....
	*/
	//???????????????????????????????????????????????????????????????????????????????????????????????


		//background
		jogo = new Personagem('img/city.png', 1, 1, 'background');		
		jogo.status = 'game';
		jogo.id = 'world';
		jogo.img.onload = function(){
			//esta medida so pode ser setada depois da imagem carregada............
			jogo.lar = (jogo.img.width / jogo.col) * jogo.esc;
			jogo.alt = (jogo.img.height / jogo.lin) * jogo.esc;
			sprites.push(jogo);//jogo[0] primeiro sprite do game...
		}
		//player
		objSpr = new Personagem('img/players.png', 12, 8, 'player');		
		objSpr.status = 'grupo';
		objSpr.esc = 1;
		objSpr.posX = 800;//2650;
		objSpr.posY = 420;//300;
		objSpr.nFrames = 3;
		objSpr.txFrequencia = 10;
		objSpr.img.onload = function(){
			//esta medida so pode ser setada depois da imagem carregada............
			objSpr.lar = (objSpr.img.width / objSpr.col) * objSpr.esc;
			objSpr.alt = (objSpr.img.height / objSpr.lin) * objSpr.esc;

			sprites.push(objSpr);		
		}

	//????????????????????????????????????????????????????????????????????????????????????????????????
	/*/player ou gamer   principal.....
		//loadSprites(   src da imagem,  colunas,    linhas,     flag,       descrição do sprite );
		//loadSprites('img/player.png', 3, 4, 'player', null);
		loadSprites('img/players.png', 12, 8, 'player', 'grupo');
		sprites[sprites.length-1].esc = 1;
		sprites[achar('player')].posX = 800;//2650;
		sprites[achar('player')].posY = 420;//300;
		sprites[achar('player')].nFrames = 3;
		sprites[achar('player')].txFrequencia = 10;
	/*/
	//npc gp-indo-trampa spriteSheet de grupo...
		loadSprites('img/players1.png', 12, 8, 'npc', '');
		sprites[sprites.length-1].id = 'gp-indo-trampa';
		sprites[sprites.length-1].speed = 5;
		sprites[sprites.length-1].worldX = 672;
		sprites[sprites.length-1].worldY = 320;
		sprites[sprites.length-1].grCol = 2;
		sprites[sprites.length-1].grLin = 1;
		sprites[sprites.length-1].nFrames = 3;
		sprites[sprites.length-1].direcao = 0;
		sprites[sprites.length-1].esc = 1;
		//
		gpTrampando = new Personagem('img/player1.png', 3, 4, 'npc');
			gpTrampando.id = 'gp-trampando';
			gpTrampando.esc = .75;
			gpTrampando.speed = 3;
			gpTrampando.worldX = 665;//this.worldX;
			gpTrampando.worldY = 515;//this.worldY;
			gpTrampando.nFrames = 3;
			gpTrampando.txFrequencia = 25;
			gpTrampando.direcao = 0;
			gpTrampando.status = 'moveDown';
			gpTrampando.img.onload = function(){
				//console.log('img '+ indce +' src = '+ sprites[indce].img.src);
				//ajusta largura e altura do quadro conforme medidas / n quadros
				//esta medida so pode ser setada depois da imagem carregada............
					gpTrampando.lar = (gpTrampando.img.width / gpTrampando.col) * gpTrampando.esc;
					gpTrampando.alt = gpTrampando.img.height / gpTrampando.lin * gpTrampando.esc;
				//contImg++;
			}
	//npc's
		/*/npc coelho spriteSheet linha
			loadSprites('img/coelho.png', 8, 1, 'npc', 'moveRight');
			sprites[sprites.length-1].esc = 0.25;
			sprites[sprites.length-1].speed = 7;
			sprites[sprites.length-1].worldX = 0;
			sprites[sprites.length-1].worldY = 75;
			sprites[sprites.length-1].nFrames = 8;
		//npc peladinha morena
			loadSprites('img/player1.png', 3, 4, 'npc', 'moveRight');
			sprites[sprites.length-1].esc = 0.70;
			sprites[sprites.length-1].speed = 6
			sprites[sprites.length-1].worldX = 75;
			sprites[sprites.length-1].worldY = 75;
			sprites[sprites.length-1].direcao = 2;
		//npc picachu spriteSheet de grupo...
			loadSprites('img/players2.png', 12, 8, 'npc', 'moveLeft');
			sprites[sprites.length-1].speed = 15;
			sprites[sprites.length-1].worldX = 1355;
			sprites[sprites.length-1].worldY = 275;
			sprites[sprites.length-1].grCol = 3;
			sprites[sprites.length-1].grLin = 1;
			sprites[sprites.length-1].nFrames = 3;
			sprites[sprites.length-1].direcao = 1;
			sprites[sprites.length-1].esc = 1.5;
		/*/
	//partes do cenario que alternam entre exibir = true, false
		arvore(93, 37);
		arvore(-3, 293);
		arvore(221, 5);
		arvore(317, 69);
		arvore(477,69);
		//predio azul 01...
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//predio azul parte de cima 2 andar parede intangivel
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = 256;
				sprites[sprites.length-1].srcY = 223;
				sprites[sprites.length-1].lar = 128;
				sprites[sprites.length-1].alt = 130;
				sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = true;
				sprites[sprites.length-1].id = 'predio';
				contImg++;	
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede solida esquerda
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY + 100;
				sprites[sprites.length-1].lar = 25;
				sprites[sprites.length-1].alt = 35;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY + 100;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'predio';
				contImg++;
			let tamanhoPorta = 70;
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//limite acima da porta
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;//258;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY;//323;
				sprites[sprites.length-1].lar = sprites[sprites.length-3].lar;//250;
				sprites[sprites.length-1].alt = 1;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX;//150;//sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY;//150;//sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'porta';
				sprites[sprites.length-1].txt = 'porta do predio azul';
				contImg++;
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede solida direita
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX + tamanhoPorta;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY;
				sprites[sprites.length-1].lar = sprites[sprites.length-2].lar - tamanhoPorta;
				sprites[sprites.length-1].alt = 35;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX + tamanhoPorta;//sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY;//sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'predio';
				contImg++;
			/*/predio azul parte de baixo 1 andar terreo... 
			//Obs: esta parte precisa ficar abaixo do player na pilha de sprites ou estar desenhada no bacground / mapa
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede intangivel
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-3].srcX;//256;
				sprites[sprites.length-1].srcY = sprites[sprites.length-3].srcY + sprites[sprites.length-3].alt;
				sprites[sprites.length-1].lar = sprites[sprites.length-3].lar;
				sprites[sprites.length-1].alt = 60;
				sprites[sprites.length-1].worldX = sprites[sprites.length-3].worldX;//sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-3].worldY + sprites[sprites.length-3].alt;//sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = true;
				sprites[sprites.length-1].id = 'predio';
				contImg++;*/
		//////////////////////////////////////////////////////////
		//predio amarelo 02...
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//predio parte de cima 2 andar parede intangivel
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = 384;
				sprites[sprites.length-1].srcY = 273;
				sprites[sprites.length-1].lar = 128;
				sprites[sprites.length-1].alt = 80;
				sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = true;
				sprites[sprites.length-1].id = 'predio';
				contImg++;	
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede solida esquerda
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].lar = 25;//define inicio da porta
				sprites[sprites.length-1].alt = 6;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'predio';
				contImg++;
			tamanhoPorta = 70;
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//limite acima da porta
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;//258;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY - sprites[sprites.length-3].alt/2;//323;
				sprites[sprites.length-1].lar = sprites[sprites.length-3].lar;//250;
				sprites[sprites.length-1].alt = 1;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX;//150;//sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY - sprites[sprites.length-3].alt/2;//150;//sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'porta';
				sprites[sprites.length-1].txt = 'porta do predio azul';
				contImg++;		
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//limite amarelo
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = 453;
				sprites[sprites.length-1].srcY = 323;
				sprites[sprites.length-1].lar = 50;
				sprites[sprites.length-1].alt = 30;
				sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'predio';
				contImg++;	
		//////////////////////////////////////////////////////////
		//predio azul 03...
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//predio azul parte de cima 2 andar parede intangivel
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = 640;//primeira parte do teto
				sprites[sprites.length-1].srcY = 191;
				sprites[sprites.length-1].lar = 97;
				sprites[sprites.length-1].alt = 165;
				sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = true;
				sprites[sprites.length-1].id = 'predio';
				contImg++;
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//predio azul parte de cima 2 andar parede intangivel
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX + sprites[sprites.length-2].lar;//segunda parte do teto
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY + 65;
				sprites[sprites.length-1].lar = 63;
				sprites[sprites.length-1].alt = sprites[sprites.length-2].alt - 65;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX + sprites[sprites.length-2].lar;//sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY + 65;//sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = true;
				sprites[sprites.length-1].id = 'predio';
				contImg++;
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede solida esquerda
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-3].srcX;
				sprites[sprites.length-1].srcY = sprites[sprites.length-3].srcY + 100 + 33;
				sprites[sprites.length-1].lar = 25;
				sprites[sprites.length-1].alt = 66 - 33;
				sprites[sprites.length-1].worldX = sprites[sprites.length-3].worldX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-3].worldY + 100 + 33;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'predio';
				contImg++;
			tamanhoPorta = 70;
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//limite acima da porta
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;//258;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY;//323;
				sprites[sprites.length-1].lar = sprites[sprites.length-3].lar;//250;
				sprites[sprites.length-1].alt = 1;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX;//150;//sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY;//150;//sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'porta';
				sprites[sprites.length-1].txt = 'porta do predio azul';
				contImg++;
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede solida direita
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX + tamanhoPorta;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY;
				sprites[sprites.length-1].lar = sprites[sprites.length-2].lar *1.45;
				sprites[sprites.length-1].alt = 66 - 33;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX + tamanhoPorta;//sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY;//sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'predio';
				contImg++;
			//predio azul parte de baixo 1 andar terreo... 
			//Obs: esta parte precisa ficar abaixo do player na pilha de sprites ou estar desenhada no bacground / mapa
			/*sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede intangivel
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-3].srcX;//256;
				sprites[sprites.length-1].srcY = sprites[sprites.length-3].srcY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].lar = sprites[sprites.length-2].lar * 1.75;
				sprites[sprites.length-1].alt = 28;
				sprites[sprites.length-1].worldX = sprites[sprites.length-3].worldX;//sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY + sprites[sprites.length-2].alt -1;//sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = true;
				sprites[sprites.length-1].id = 'predio';
				contImg++;*/
		//////////////////////////////////////////////////////////
		//predio azul 04...
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//predio parte de cima 2 andar parede intangivel
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = 1279;
				sprites[sprites.length-1].srcY = 159;
				sprites[sprites.length-1].lar = 257;
				sprites[sprites.length-1].alt = 159;
				sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = true;
				sprites[sprites.length-1].id = 'predio';
				contImg++;	
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede solida esquerda
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY + sprites[sprites.length-2].alt - 50;
				sprites[sprites.length-1].lar = 100;//define inicio da porta
				sprites[sprites.length-1].alt = 55;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY + sprites[sprites.length-2].alt - 50;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'parede solida';
				contImg++;
			tamanhoPorta = 80;
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//limite acima da porta
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;//258;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY;//323;
				sprites[sprites.length-1].lar = sprites[sprites.length-3].lar;//250;
				sprites[sprites.length-1].alt = 1;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX;//150;//sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY;//150;//sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'porta';
				sprites[sprites.length-1].txt = 'porta do predio azul';
				contImg++;
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede solida direita
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX + tamanhoPorta*2;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY;
				sprites[sprites.length-1].lar = sprites[sprites.length-2].lar/3 + 10;
				sprites[sprites.length-1].alt = sprites[sprites.length-3].alt;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX + tamanhoPorta*2;//sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY;//sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'predio';
				contImg++;
			//predio azul parte de baixo 1 andar terreo... 
			//Obs: esta parte precisa ficar abaixo do player na pilha de sprites ou estar desenhada no bacground / mapa
			/*sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede intangivel
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-4].srcX;//256;
				sprites[sprites.length-1].srcY = sprites[sprites.length-4].srcY + sprites[sprites.length-4].alt/2 + 2;
				sprites[sprites.length-1].lar = sprites[sprites.length-3].lar;
				sprites[sprites.length-1].alt = sprites[sprites.length-2].alt;
				sprites[sprites.length-1].worldX = sprites[sprites.length-4].worldX;//sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-4].worldY + sprites[sprites.length-4].alt/2 +2;//sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = true;
				sprites[sprites.length-1].id = 'predio';
				contImg++;*/
		//////////////////////////////////////////////////////////////////////
		//predio azul 05...
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//predio parte de cima 2 andar parede intangivel
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = 2431;
				sprites[sprites.length-1].srcY = 189;
				sprites[sprites.length-1].lar = 447;
				sprites[sprites.length-1].alt = 160;
				sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = true;
				sprites[sprites.length-1].id = 'predio';
				contImg++;	
				//console.log('worldX: '+ sprites[sprites.length-1].worldX + ' , worldY: '+ sprites[sprites.length-1].worldY);
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede solida full largY;
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY + sprites[sprites.length-2].alt - 60;
				sprites[sprites.length-1].lar = sprites[sprites.length-2].lar;//largura da parte de cima
				sprites[sprites.length-1].alt = 60;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY + sprites[sprites.length-2].alt - 60;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'predio';
				contImg++;
				//console.log('worldX: '+ sprites[sprites.length-1].worldX + ' , worldY: '+ sprites[sprites.length-1].worldY);
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//telhado 2
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX + 128;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].lar = 193;//define inicio da porta
				sprites[sprites.length-1].alt = 40;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX + 128;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].acima = true;
				sprites[sprites.length-1].id = 'predio';
				contImg++;
				//console.log('worldX: '+ sprites[sprites.length-1].worldX + ' , worldY: '+ sprites[sprites.length-1].worldY);
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede solida esquerda
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-3].srcX + 128;
				sprites[sprites.length-1].srcY = sprites[sprites.length-3].srcY + sprites[sprites.length-3].alt;
				sprites[sprites.length-1].lar = 55;//define inicio da porta
				sprites[sprites.length-1].alt = 40;
				sprites[sprites.length-1].worldX = sprites[sprites.length-3].worldX + 128;
				sprites[sprites.length-1].worldY = sprites[sprites.length-3].worldY + sprites[sprites.length-3].alt;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'predio';
				contImg++;
				//console.log('worldX: '+ sprites[sprites.length-1].worldX + ' , worldY: '+ sprites[sprites.length-1].worldY);
			tamanhoPorta = 80;
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//limite acima da porta
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;//258;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY - sprites[sprites.length-3].alt/2;//323;
				sprites[sprites.length-1].lar = sprites[sprites.length-3].lar;//250;
				sprites[sprites.length-1].alt = 1;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX;//150;//sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY;//150;//sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'porta';
				sprites[sprites.length-1].txt = 'porta do predio azul';
				contImg++;
				//console.log('worldX: '+ sprites[sprites.length-1].worldX + ' , worldY: '+ sprites[sprites.length-1].worldY);
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede solida a direita
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-3].srcX + sprites[sprites.length-3].lar + tamanhoPorta;
				sprites[sprites.length-1].srcY = sprites[sprites.length-3].srcY;
				sprites[sprites.length-1].lar = 50;
				sprites[sprites.length-1].alt = sprites[sprites.length-3].alt;
				sprites[sprites.length-1].worldX = sprites[sprites.length-3].worldX + sprites[sprites.length-3].lar + tamanhoPorta;
				sprites[sprites.length-1].worldY = sprites[sprites.length-3].worldY;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'predio';
				contImg++;
				//console.log('worldX: '+ sprites[sprites.length-1].worldX + ' , worldY: '+ sprites[sprites.length-1].worldY);	
		//////////////////////////////////////////////////////////
		//muro do predio acima...
			//console.log('muro');
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//muro parte de cima intangivel
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = 2368;
				sprites[sprites.length-1].srcY = 127;
				sprites[sprites.length-1].lar = 576;
				sprites[sprites.length-1].alt = 35;
				sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = true;
				sprites[sprites.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ sprites[sprites.length-1].worldX + ' , worldY: '+ sprites[sprites.length-1].worldY);
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede solida full largura de cima do muro
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].lar = sprites[sprites.length-2].lar;//largura da parte de cima
				sprites[sprites.length-1].alt = 1;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ sprites[sprites.length-1].worldX + ' , worldY: '+ sprites[sprites.length-1].worldY);
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede solida full largura esquerda
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].lar = 32;
				sprites[sprites.length-1].alt = 318;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ sprites[sprites.length-1].worldX + ' , worldY: '+ sprites[sprites.length-1].worldY);
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede solida full largura direita
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-3].srcX + sprites[sprites.length-3].lar - sprites[sprites.length-2].lar;
				sprites[sprites.length-1].srcY = sprites[sprites.length-3].srcY + sprites[sprites.length-3].alt;
				sprites[sprites.length-1].lar = 32;
				sprites[sprites.length-1].alt = 318;
				sprites[sprites.length-1].worldX = sprites[sprites.length-3].worldX + sprites[sprites.length-3].lar - sprites[sprites.length-2].lar;
				sprites[sprites.length-1].worldY = sprites[sprites.length-3].worldY + sprites[sprites.length-3].alt;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ sprites[sprites.length-1].worldX + ' , worldY: '+ sprites[sprites.length-1].worldY);
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//muro solido horizontal esquerda entrada
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-3].srcX + sprites[sprites.length-3].lar;
				sprites[sprites.length-1].srcY = sprites[sprites.length-3].srcY + sprites[sprites.length-3].alt - 34;
				sprites[sprites.length-1].lar = 192;
				sprites[sprites.length-1].alt = 35;
				sprites[sprites.length-1].worldX = sprites[sprites.length-3].worldX + sprites[sprites.length-3].lar;
				sprites[sprites.length-1].worldY = sprites[sprites.length-3].worldY + sprites[sprites.length-3].alt - 34;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ sprites[sprites.length-1].worldX + ' , worldY: '+ sprites[sprites.length-1].worldY);
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//muro solido horizontal direita entrada
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX + sprites[sprites.length-2].lar + 130;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY + sprites[sprites.length-2].alt - 34;
				sprites[sprites.length-1].lar = 192;
				sprites[sprites.length-1].alt = 35;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX + sprites[sprites.length-2].lar + 132;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY + sprites[sprites.length-2].alt - 34;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ sprites[sprites.length-1].worldX + ' , worldY: '+ sprites[sprites.length-1].worldY);
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//muro solido vertical direita entrada
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].lar = 33;
				sprites[sprites.length-1].alt = 35;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ sprites[sprites.length-1].worldX + ' , worldY: '+ sprites[sprites.length-1].worldY);
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//muro solido vertical esquerda entrada
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX - 165;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY;
				sprites[sprites.length-1].lar = 35;
				sprites[sprites.length-1].alt = 35;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX - 167;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY - 1;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'muro';
				contImg++;
				//console.log('worldX: '+ sprites[sprites.length-1].worldX + ' , worldY: '+ sprites[sprites.length-1].worldY);
		////////////////////////////////////////////////////
		//predio rosa 06...
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//predio parte de cima 2 andar parede intangivel
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = 642;
				sprites[sprites.length-1].srcY = 464;
				sprites[sprites.length-1].lar = 128;
				sprites[sprites.length-1].alt = 80;
				sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = true;
				sprites[sprites.length-1].id = 'predio';
				contImg++;	
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//parede solida esquerda
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].lar = 25;//define inicio da porta
				sprites[sprites.length-1].alt = 6;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'predio';
				contImg++;
			tamanhoPorta = 70;
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//limite acima da porta
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;//258;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY - sprites[sprites.length-3].alt/2;//323;
				sprites[sprites.length-1].lar = sprites[sprites.length-3].lar;//250;
				sprites[sprites.length-1].alt = 1;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX;//150;//sprites[sprites.length-1].srcX;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY - sprites[sprites.length-3].alt/2;//150;//sprites[sprites.length-1].srcY;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'porta';
				sprites[sprites.length-1].txt = 'porta do predio azul';
				contImg++;		
			sprites.push(new Personagem('img/city.png', 1, 1, 'npc'));//limite amarelo
				sprites[sprites.length-1].fr = 0;
				sprites[sprites.length - 1].status = 'fixo';
				sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX + tamanhoPorta;
				sprites[sprites.length-1].srcY = sprites[sprites.length-2].srcY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].lar = 50;
				sprites[sprites.length-1].alt = 40;
				sprites[sprites.length-1].worldX = sprites[sprites.length-2].worldX + tamanhoPorta;
				sprites[sprites.length-1].worldY = sprites[sprites.length-2].worldY + sprites[sprites.length-2].alt;
				sprites[sprites.length-1].acima = false;
				sprites[sprites.length-1].id = 'predio';
				contImg++;	
		//////////////////////////////////////////////////////////
		//caixas empilhadas
		sprites.push(new Personagem('img/city.png', 1, 1,'npc'));//pedra 0.0 alterna
			sprites[sprites.length-1].txt = 'pexoExibe';
			sprites[sprites.length-1].fr = 0;
			sprites[sprites.length - 1].status = 'fixo';
			sprites[sprites.length-1].srcX = 767;
			sprites[sprites.length-1].srcY = 526;
			sprites[sprites.length-1].lar = 32;
			sprites[sprites.length-1].alt = 33;
			sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
			sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
			sprites[sprites.length-1].acima = true;//???????????????????????????????????
			contImg++;
		sprites.push(new Personagem('img/city.png', 1, 1,'npc'));//pedra 0.1 bloqueia
			sprites[sprites.length-1].txt = 'pexoExibe';
			sprites[sprites.length-1].fr = 0;
			sprites[sprites.length - 1].status = 'fixo';
			sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;
			sprites[sprites.length-1].srcY = 15 + sprites[sprites.length-2].srcY;
			sprites[sprites.length-1].lar = 23;
			sprites[sprites.length-1].alt = 10;
			sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
			sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
			sprites[sprites.length-1].acima = false;
			sprites[sprites.length-1].id = 'caixas';
			contImg++;
	//tronco, pedra, moita, baril...
		tronco(242, 110);
		tronco(627, 110);
		pedra(69, 162);
		pedra(198, 66);
		moita(129, 259);
		moitinha(173, 334);
		baril(866, 512);
		baril(802, 512);
		baril(802, 540);
	//
	mileniunFalconRight = new Personagem('img/mileniunFalconRight.png', 1, 1, 'npc');
		mileniunFalconRight.status = 'moveRight';
		mileniunFalconRight.esc = .5;
		mileniunFalconRight.fr = 0;
		mileniunFalconRight.txFrequencia = 1;
		mileniunFalconRight.speed = Math.floor((Math.random() * 15) + 1);
		mileniunFalconRight.worldX = 0;
		mileniunFalconRight.worldY = Math.floor((Math.random() * 3000) + 1);
		mileniunFalconRight.nFrames = 1;
		mileniunFalconRight.exibir = true;
		mileniunFalconRight.id = 'ovni';
		mileniunFalconRight.txt = 'naveMae';
		mileniunFalconRight.acima = true;
		mileniunFalconRight.etc = 'starWars';
		mileniunFalconRight.img.onload = function(){
			//console.log('img '+ indce +' src = '+ sprites[indce].img.src);
			//ajusta largura e altura do quadro conforme medidas / n quadros
			//esta medida so pode ser setada depois da imagem carregada............
				mileniunFalconRight.lar = (mileniunFalconRight.img.width / mileniunFalconRight.col) * mileniunFalconRight.esc;
				mileniunFalconRight.alt = (mileniunFalconRight.img.height / mileniunFalconRight.lin) * mileniunFalconRight.esc;
				//mileniunFalconRight.worldX = mileniunFalconRight.lar * -1;
			sprites.push(mileniunFalconRight);
			contImg++;
		}
	mileniunFalconLeft = new Personagem('img/mileniunFalcon.png', 1, 1, 'npc');
		mileniunFalconLeft.status = 'moveLeft';
		mileniunFalconLeft.esc = .5;
		mileniunFalconLeft.fr = 0;
		mileniunFalconLeft.txFrequencia = 1;
		mileniunFalconLeft.speed = Math.floor((Math.random() * 5) + 1) + 40;
		mileniunFalconLeft.worldX = 0;
		mileniunFalconLeft.worldY = Math.floor((Math.random() * 3000) + 1);
		mileniunFalconLeft.nFrames = 1;
		mileniunFalconLeft.exibir = true;
		mileniunFalconLeft.id = 'ovni';
		mileniunFalconLeft.txt = 'naveMae';
		mileniunFalconLeft.acima = true;
		mileniunFalconLeft.etc = 'starWars';
		mileniunFalconLeft.img.onload = function(){
			//console.log('img '+ indce +' src = '+ sprites[indce].img.src);
			//ajusta largura e altura do quadro conforme medidas / n quadros
			//esta medida so pode ser setada depois da imagem carregada............
				mileniunFalconLeft.lar = (mileniunFalconLeft.img.width / mileniunFalconLeft.col) * mileniunFalconLeft.esc;
				mileniunFalconLeft.alt = (mileniunFalconLeft.img.height / mileniunFalconLeft.lin) * mileniunFalconLeft.esc;
				//mileniunFalconLeft.worldX = mileniunFalconLeft.lar * -1;
			//sprites.push(mileniunFalconLeft);
			//contImg++;
		}
	//npc ovni spriteSheet linha
	loadSprites('img/ovni.png', 3, 1, 'npc', 'moveRight');
		sprites[sprites.length-1].esc = 1;
		sprites[sprites.length-1].speed = Math.floor((Math.random() * 30) + 1);
		sprites[sprites.length-1].worldX = 0;
		sprites[sprites.length-1].worldY = Math.floor((Math.random() * 3000) + 1);
		sprites[sprites.length-1].nFrames = 3;
		sprites[sprites.length-1].exibir = true;
		sprites[sprites.length-1].id = 'ovni';
		sprites[sprites.length-1].txt = 'naveMae';
		sprites[sprites.length-1].acima = true;
	/*/
	loadSprites('img/ovni2.png', 16, 2, 'npc', 'moveRight');
		sprites[sprites.length-1].esc = 1;
		sprites[sprites.length-1].speed = Math.floor((Math.random() * 30) + 1);
		sprites[sprites.length-1].worldX = 900;
		sprites[sprites.length-1].worldY = 1500;//Math.floor((Math.random() * 3000) + 1);
		sprites[sprites.length-1].nFrames = 8;
		sprites[sprites.length-1].exibir = true;
		sprites[sprites.length-1].id = 'ovni';
		sprites[sprites.length-1].txt = 'naveFilha';
		sprites[sprites.length-1].acima = true;
		sprites[sprites.length-1].direcao = 0;
	/*/////////////////////////////////////////////////////////////////////////////////
	nuvem();
	//textos.....
	//loadSprites(hello word,     esquerda meio etc, cima meio baixo, flag, status ou funcionalidade
	loadSprites('texto', 'esquerda', 'baixo', 'txt', 'gpsPlayer');
	loadSprites('upCenter', 'esquerda', 'cima', 'txt', 'gpsMouse');//gpsMouse	
	//sprites = jogo;
	loop();	
}
function nuvem(){
	//nuvem 	move-se com posX e posY pois so aparece na tela grande
	 let velocidade = Math.floor((Math.random() * 10)+1);// tem a ver com velocidade da nuvem
	for (let i = 0; i < Math.floor((Math.random() * 30) + 1); i++) {
		loadSprites('img/cloud.png', 1, 1, 'nuvem', 'oculto');
			sprites[sprites.length-1].esc = 1;
			sprites[sprites.length-1].speed = 2;
			sprites[sprites.length-1].posX = Math.floor((Math.random() * 2200));
			sprites[sprites.length-1].posY = Math.floor((Math.random() * 3100));//sprites[encontrar('background')].img.height
			sprites[sprites.length-1].nFrames = 1;
			sprites[sprites.length-1].fr = 0;//quando é somente um frame a frequencia deve ser zero
			sprites[sprites.length-1].exibir = false;
			sprites[sprites.length-1].txFrequencia = velocidade;
	}
}
//carrega sprite e array com todas as imagens..........................................................
function loadSprites(src, col, lin, flag, status){	
	if (flag == 'txt') {
		sprites.push(new Texto('00', lin, col, status));
	}else{
		sprites.push(new Personagem(src, col, lin, flag));
		let indce = sprites.length - 1;
		//console.log('col ==>'+ sprites[indce].col +' lar ==>'+ sprites[indce].lar);
		sprites[indce].status = status;
		sprites[indce].img.onload = function(){
			//console.log('img '+ indce +' src = '+ sprites[indce].img.src);
			//ajusta largura e altura do quadro conforme medidas / n quadros
			//esta medida so pode ser setada depois da imagem carregada............
				sprites[indce].lar = (sprites[indce].img.width / sprites[indce].col) * sprites[indce].esc;
				sprites[indce].alt = (sprites[indce].img.height / sprites[indce].lin) * sprites[indce].esc;
				

			contImg++;
		}		
	}
}
function arvore(x, y){
	//arvore
		sprites.push(new Personagem('img/forest1.png', 1, 1, 'npc'));//copa da arvore e tronco da são de imagens diferentes por isto ñ é posivel proporcionar suas posições
			sprites[sprites.length-1].txt = 'pexoExibe';
			sprites[sprites.length-1].fr = 0;
			sprites[sprites.length - 1].status = 'fixo';
			sprites[sprites.length-1].srcX = 109;//109
			sprites[sprites.length-1].srcY = 15;//15
			sprites[sprites.length-1].lar = 100;
			sprites[sprites.length-1].alt = 67;
			sprites[sprites.length-1].worldX = x;
			sprites[sprites.length-1].worldY = y;
			sprites[sprites.length-1].acima = true;
			sprites[sprites.length-1].deslocaY = 50;
			sprites[sprites.length-1].id = 'copa da árvore'
			contImg++;
		sprites.push(new Personagem('img/city.png', 1, 1,'npc'));//tronco arvore 0.0 alterna
			sprites[sprites.length-1].txt = 'pexoExibe';
			sprites[sprites.length-1].fr = 0;
			sprites[sprites.length - 1].status = 'fixo';
			sprites[sprites.length-1].srcX = 32 + sprites[sprites.length-2].worldX;
			sprites[sprites.length-1].srcY = 50 + sprites[sprites.length-2].worldY;
			sprites[sprites.length-1].lar = 31;
			sprites[sprites.length-1].alt = 17;
			sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
			sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
			sprites[sprites.length-1].acima = true;
			contImg++;
		sprites.push(new Personagem('img/city.png', 1, 1,'npc'));//tronco arvore 0.1 bloqueia
			sprites[sprites.length-1].txt = 'pexoExibe';
			sprites[sprites.length-1].fr = 0;
			sprites[sprites.length - 1].status = 'fixo';
			sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;
			sprites[sprites.length-1].srcY = 10 + sprites[sprites.length-2].srcY;
			sprites[sprites.length-1].lar = 33;
			sprites[sprites.length-1].alt = 5;
			sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
			sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
			sprites[sprites.length-1].acima = false;
			sprites[sprites.length-1].id = 'tronco arvore'
			contImg++;
	//
}
function tronco(x, y){
	sprites.push(new Personagem('img/city.png', 1, 1,'npc'));//tronco arvore 0.0 alterna
		sprites[sprites.length-1].txt = 'pexoExibe';
		sprites[sprites.length-1].fr = 0;
		sprites[sprites.length - 1].status = 'fixo';
		sprites[sprites.length-1].srcX = x;//242;
		sprites[sprites.length-1].srcY = y;//110;
		sprites[sprites.length-1].lar = 28;
		sprites[sprites.length-1].alt = 35;
		sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
		sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
		sprites[sprites.length-1].acima = true;//???????????????????????????????????
		contImg++;
	sprites.push(new Personagem('img/city.png', 1, 1,'npc'));//tronco arvore 0.1 bloqueia
		sprites[sprites.length-1].txt = 'pexoExibe';
		sprites[sprites.length-1].fr = 0;
		sprites[sprites.length - 1].status = 'fixo';
		sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;
		sprites[sprites.length-1].srcY = 10 + sprites[sprites.length-2].srcY;
		sprites[sprites.length-1].lar = 33;
		sprites[sprites.length-1].alt = 5;
		sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
		sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
		sprites[sprites.length-1].acima = false;
		sprites[sprites.length-1].id = 'tronco';
		contImg++;
	
}
function baril(x, y){
	sprites.push(new Personagem('img/city.png', 1, 1,'npc'));//pedra 0.0 alterna
	sprites[sprites.length-1].txt = 'pexoExibe';
	sprites[sprites.length-1].fr = 0;
	sprites[sprites.length - 1].status = 'fixo';
	sprites[sprites.length-1].srcX = x;
	sprites[sprites.length-1].srcY = y;
	sprites[sprites.length-1].lar = 28;
	sprites[sprites.length-1].alt = 33;
	sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
	sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
	sprites[sprites.length-1].acima = true;//???????????????????????????????????
	contImg++;
	sprites.push(new Personagem('img/city.png', 1, 1,'npc'));//pedra 0.1 bloqueia
	sprites[sprites.length-1].txt = 'pexoExibe';
	sprites[sprites.length-1].fr = 0;
	sprites[sprites.length - 1].status = 'fixo';
	sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;
	sprites[sprites.length-1].srcY = 15 + sprites[sprites.length-2].srcY;
	sprites[sprites.length-1].lar = 23;
	sprites[sprites.length-1].alt = 1;
	sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
	sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
	sprites[sprites.length-1].acima = false;
	sprites[sprites.length-1].id = 'baril';
	contImg++;
}
function pedra(x, y){
	sprites.push(new Personagem('img/city.png', 1, 1,'npc'));//pedra 0.0 alterna
		sprites[sprites.length-1].txt = 'pexoExibe';
		sprites[sprites.length-1].fr = 0;
		sprites[sprites.length - 1].status = 'fixo';
		sprites[sprites.length-1].srcX = x;//69;
		sprites[sprites.length-1].srcY = y;//162;
		sprites[sprites.length-1].lar = 25;
		sprites[sprites.length-1].alt = 26;
		sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
		sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
		sprites[sprites.length-1].acima = true;//???????????????????????????????????
		contImg++;
	sprites.push(new Personagem('img/city.png', 1, 1,'npc'));//pedra 0.1 bloqueia
		sprites[sprites.length-1].txt = 'pexoExibe';
		sprites[sprites.length-1].fr = 0;
		sprites[sprites.length - 1].status = 'fixo';
		sprites[sprites.length-1].srcX = sprites[sprites.length-2].srcX;
		sprites[sprites.length-1].srcY = 10 + sprites[sprites.length-2].srcY;
		sprites[sprites.length-1].lar = 23;
		sprites[sprites.length-1].alt = 5;
		sprites[sprites.length-1].worldX = sprites[sprites.length-1].srcX;
		sprites[sprites.length-1].worldY = sprites[sprites.length-1].srcY;
		sprites[sprites.length-1].acima = false;
		sprites[sprites.length-1].id = 'pedra';
		contImg++;
}
function moita(x, y){
	sprites.push(new Personagem('img/forest1.png', 1, 1, 'npc'));//moita de imagen diferente por isto ñ é diferente suas posições de src e word
			sprites[sprites.length-1].txt = 'pexoExibe';
			sprites[sprites.length-1].fr = 0;
			sprites[sprites.length - 1].status = 'fixo';
			sprites[sprites.length-1].srcX = 49;//109
			sprites[sprites.length-1].srcY = 140;//15
			sprites[sprites.length-1].lar = 63;
			sprites[sprites.length-1].alt = 60;
			sprites[sprites.length-1].worldX = x;
			sprites[sprites.length-1].worldY = y;
			sprites[sprites.length-1].acima = true;
			sprites[sprites.length-1].deslocaY = 50;
			sprites[sprites.length-1].id = 'moita';
			contImg++;	
}
function moitinha(x, y){
	sprites.push(new Personagem('img/moitinha.png', 1, 1, 'npc'));//moitinha de imagen diferente por isto ñ é diferente suas posições de src e word
			sprites[sprites.length-1].txt = 'pexoExibe';
			sprites[sprites.length-1].fr = 0;
			sprites[sprites.length - 1].status = 'fixo';
			sprites[sprites.length-1].srcX = 0;
			sprites[sprites.length-1].srcY = 0;
			sprites[sprites.length-1].lar = 43;
			sprites[sprites.length-1].alt = 40;
			sprites[sprites.length-1].worldX = x;
			sprites[sprites.length-1].worldY = y;
			sprites[sprites.length-1].acima = true;
			sprites[sprites.length-1].deslocaY = 50;
			sprites[sprites.length-1].id = 'moitinha';
			contImg++;	

}
function player(){//substituir por achar
	//descobre qual obj do array é o player
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == 'player') {
			return i;
		}
	}
}
function encontrar(flag){//substituir por achar
	//descobre qual obj do array é o player
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == flag) {
			return i;
		}
	}
}
function achar(flag, status){
	for (let i = sprites.length - 1; i >= 0; i--) {
		if (sprites[i].flag == flag && (sprites[i].status == status || sprites[i].status == '' || sprites[i].status == null || sprites[i].status == 'mapa' || sprites[i].status == 'grupo') ) {
			return i;//
		}
	}
}
function loop(){
	// limpar tela
	ctx.clearRect(0,0,cnv.width,cnv.height);

	//conta sprites carregamento loading
	//if (contImg == sprites.length) {
		//console.log('sprites carregados');
		for (let i = 0 ; i < sprites.length; i++) {//percorre array de sprites
			if (!pause) {// || sprites[i].flag == 'nuvem' || sprites[i].id == 'ovni'
				sprites[i].anima();
			}			
			sprites[i].desenha();			
		}		
	/*}else{
		console.log('carregando... '+contImg);
	}*/

	//animação / repetição...
	contLoop++;
	requestAnimationFrame(loop, "canvas");
}
function alternarMapa(){//quando aciona tecla muda status do background
	//console.log('funcionalidade....');
	if (sprites[encontrar('background')].status == 'mapa') {//muda para tela de jogo
				metaWidth = 670;
				metaHeight = 300;				
				sprites[encontrar('background')].taxaDimX = 64;
				sprites[encontrar('background')].taxaDimY = 64;
				//elementos que ñ devem ser exibidos na tela de jogo....
				for (let i = sprites.length - 1; i >= 0; i--) {
					if (sprites[i].flag == 'nuvem') {// || sprites[i].id == 'naveMae'
						//sprites[i].status = 'oculto';//mudei aqui comentei este trecho...
						sprites[i].exibir = false;
					}
				}
				sprites[encontrar('background')].status = '';
	}else{//mostra todo mapa saindo da tela de jogo...
		//elementos que somente são exibidos no mapa...
		//console.log('mapa');
		for (let i = sprites.length - 1; i >= 0; i--) {
			if (sprites[i].flag == 'nuvem') {
				sprites[i].status = 'moveRight';
				sprites[i].exibir = true;
			}
		}
		metaWidth = sprites[encontrar('background')].img.width;//tamanho da tela exibida
		metaHeight = sprites[encontrar('background')].img.height;				
		sprites[achar('player')].posX = sprites[achar('player')].posX + sprites[encontrar('background')].srcX;
		sprites[achar('player')].posY = sprites[achar('player')].posY + sprites[encontrar('background')].srcY;
		sprites[encontrar('background')].taxaCresX = 64;
		sprites[encontrar('background')].taxaCresY = 64;
		sprites[encontrar('background')].taxaAumenX = 64;
		sprites[encontrar('background')].taxaAumenY = 64;				
		sprites[encontrar('background')].status = 'mapa';
	}
}
cnv.addEventListener('click', event =>   //mouse
{
    let rect = cnv.getBoundingClientRect();
    //rect é a tela do canvas
    let x = event.clientX;// - rect.left;// - cnv.clientLeft;
    let y = event.clientY;// - rect.top;// - cnv.clientTop;

    //console.log(x +' , '+ y +' tamanho da tela? ' + rect.width +' , '+ rect.height);
     let porcentMouseX = x / rect.width;
     let porcentMouseY = y / rect.height;
     let porcentPlayerX = sprites[achar('player')].meiox() / cnv.width;
     let porcentPlayerY = sprites[achar('player')].meioy() / cnv.height;
     let difX = porcentMouseX - porcentPlayerX;
     let difY = porcentMouseY - porcentPlayerY;
     

     metaHorizontal = (6 * -1) + parseInt(cnv.width * difX + sprites[achar('player')].posX + sprites[encontrar('background')].srcX) + sprites[achar('player')].lar/2;
     metaVertical = (6 * -1) + parseInt(cnv.height * difY + sprites[achar('player')].posY + sprites[encontrar('background')].srcY) + sprites[achar('player')].alt/2;

     sprites[achar('txt', 'gpsMouse')].txt = 'mouse   x,y: '+ metaHorizontal +' , '+ metaVertical;


});
//carregado janela inicia jogo...............................
window.onload = function(){
	start();
}
