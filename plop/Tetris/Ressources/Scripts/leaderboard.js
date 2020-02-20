var taille_leaderboard = 3;

function addLeader(score) 
{
	var tabLeaders;
	var pos = est_leader(score);
	if(pos == -1)
	{
		return -1;
	}
	
	else
	{
		tabLeaders = JSON.parse(localStorage['leaderBoard']);
		set_position(pos, score, tabLeaders);
	}

	localStorage['leaderBoard'] = JSON.stringify(tabLeaders);
}

function set_position(pos, score, tabLeaders)
{
	var tmp = tabLeaders[pos], tmp2;
	tabLeaders[pos] = score;
	
	for(var i = pos+1; i < tabLeaders.length ; i++)
	{
		tmp2 = tabLeaders[i];
		tabLeaders[i] = tmp;
	}
}
		

function est_leader(score)
{// Retourne la position à laquelle le score peut être placé dans le leaderboard, -1 si trop petit
	var tabLeaders;
	if (!localStorage['leaderBoard'])
	{
		tabLeaders = [];
		localStorage['leaderBoard'] = JSON.stringify(tabLeaders);
		return 0;
	}
	
	else
	{
		tabLeaders = JSON.parse(localStorage['leaderBoard']);
		for(var i = 0 ; i < tabLeaders.length ; i++)
			if(score > tabLeaders[i])
				return i;
			
		if (tabLeaders.length != taille_leaderboard)
			return tabLeaders.length;
		return -1;
	}
}

function aff_leaderboard()
{
	
	var tabLeaders = JSON.parse(localStorage['leaderBoard']);
	
	tetrisCtx.font="130px LLPIXEL3";
	tetrisCtx.textAlign="left";
	tetrisCtx.fillStyle=defaultTextColor;
	
	for(var i = 0 ; i < taille_leaderboard ; i++)
	{
		if(tabLeaders[i] != undefined)
			tetrisCtx.fillText((i+1) +" : " +tabLeaders[i], 20, 600+150*i);
		else
			tetrisCtx.fillText((i+1) +" : Vide", 20,  600+150*i);
	}
}
	
	

