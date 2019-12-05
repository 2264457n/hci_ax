let json = returnData();
console.log(json);
let region_list = [];
let total_spend =[0, 0, 0, 0, 0, 0];
let no_countries = [0, 0, 0, 0, 0, 0];
let avg_spend = [0, 0, 0, 0, 0, 0];
let afr_countries = [];
let afr_spend = [];
let ame_countries = [];
let ame_spend = [];
let em_countries = [];
let em_spend = [];
let eur_countries = [];
let eur_spend = [];
let sea_countries = [];
let sea_spend = [];
let wp_countries = [];
let wp_spend = [];

for (x in json["fact"]) {
    let region = json["fact"][x]["dim"]["REGION"];
    if (!(region_list.includes(region))) {
        region_list.push(region);
    }
    let GHO = json["fact"][x]["dim"]["GHO"];
    if (GHO === "Government expenditures on mental hospitals as a percentage of total government expenditures on mental health (%)"){
        let index = region_list.indexOf(region);
        total_spend[index] += parseFloat(json["fact"][x]["Value"]);
        no_countries[index] ++;
        switch(region) {
            case("Africa"):
                afr_countries.push(json["fact"][x]["dim"]["COUNTRY"]);
                afr_spend.push((parseFloat(json["fact"][x]["Value"])).toFixed(1));
                break;
            case("Americas"):
                ame_countries.push(json["fact"][x]["dim"]["COUNTRY"]);
                ame_spend.push((parseFloat(json["fact"][x]["Value"])).toFixed(1));
                break;
            case("Eastern Mediterranean"):
                em_countries.push(json["fact"][x]["dim"]["COUNTRY"]);
                em_spend.push((parseFloat(json["fact"][x]["Value"])).toFixed(1));
                break;
            case("Europe"):
                eur_countries.push(json["fact"][x]["dim"]["COUNTRY"]);
                eur_spend.push((parseFloat(json["fact"][x]["Value"])).toFixed(1));
                break;
            case("South-East Asia"):
                sea_countries.push(json["fact"][x]["dim"]["COUNTRY"]);
                sea_spend.push((parseFloat(json["fact"][x]["Value"])).toFixed(1));
                break;
            case("Western Pacific"):
                wp_countries.push(json["fact"][x]["dim"]["COUNTRY"]);
                wp_spend.push((parseFloat(json["fact"][x]["Value"])).toFixed(1));
                break;
        }
    }
}
console.log(region_list.length);
console.log(total_spend.length);
console.log(no_countries.length);// this will show the info it in firebug console
for (x in total_spend){
    avg_spend[x] = (total_spend[x]/no_countries[x]).toFixed(1);
}
console.log(avg_spend.length);

let ctx1 = document.getElementById('PolarAreaChart');
console.log(ctx1);
let PACData =  {
    datasets: [{
        data: avg_spend,
        backgroundColor: [
            pattern.draw('square', '#ff6384'),
            pattern.draw('circle', '#36a2eb'),
            pattern.draw('diamond', '#cc65fe'),
            pattern.draw('triangle', '#ffce56'),
            pattern.draw('plus', '#6603fc'),
            pattern.draw('cross', '#00cc36')
        ]
    }],
    labels: region_list
};
let PolarAreaChart = new Chart(ctx1, {
    data: PACData,
    type: 'polarArea',
    options: {
        maintainAspectRatio: false,
        responsive: false,
    }
});
let ctx2 = document.getElementById('afrBarChart');
let ctx3 = document.getElementById('ameBarChart');
let ctx4 = document.getElementById('emBarChart');
let ctx5 = document.getElementById('eurBarChart');
let ctx6 = document.getElementById('seaBarChart');
let ctx7 = document.getElementById('wpBarChart');
let afr_avg = [];
let ame_avg = [];
let em_avg = [];
let eur_avg = [];
let sea_avg = [];
let wp_avg = [];
for (x in afr_countries){
    afr_avg.push(avg_spend[0])
}
for (x in ame_countries){
    ame_avg.push(avg_spend[1])
}
for (x in em_countries){
    em_avg.push(avg_spend[2])
}
for (x in eur_countries){
    eur_avg.push(avg_spend[3])
}
for (x in sea_countries){
    sea_avg.push(avg_spend[4])
}
for (x in wp_countries){
    wp_avg.push(avg_spend[5])
}
let afrData = {
    datasets: [{
        data: afr_spend,
        label: "Government expenditures on mental hospitals as a percentage of total government expenditures on mental health, in %",
        backgroundColor: '#36a2eb'
    }, {
        label: "Average spend",
        data:afr_avg,
        type: 'line'
    }],
    labels: afr_countries
};
let ameData = {
    datasets: [{
        data: ame_spend,
        label: "Government expenditures on mental hospitals as a percentage of total government expenditures on mental health, in %",
        backgroundColor: '#36a2eb'
    }, {
        label: "Average spend",
        data:ame_avg,
        type: 'line'
    }],
    labels: ame_countries
};
let emData = {
    datasets: [{
        data: em_spend,
        label: "Government expenditures on mental hospitals as a percentage of total government expenditures on mental health, in %",
        backgroundColor: '#36a2eb'
    }, {
        label: "Average spend",
        data:em_avg,
        type: 'line'
    }],
    labels: em_countries
};
let eurData = {
    datasets: [{
        data: eur_spend,
        label: "Government expenditures on mental hospitals as a percentage of total government expenditures on mental health, in %",
        backgroundColor: '#36a2eb'
    }, {
        label: "Average spend",
        data:eur_avg,
        type: 'line'
    }],
    labels: eur_countries
};
let seaData = {
    datasets: [{
        data: sea_spend,
        label: "Government expenditures on mental hospitals as a percentage of total government expenditures on mental health, in %",
        backgroundColor: '#36a2eb'
    }, {
        label: "Average spend",
        data:sea_avg,
        type: 'line'
    }],
    labels: sea_countries
};
let wpData = {
    datasets: [{
        data: wp_spend,
        label: "Government expenditures on mental hospitals as a percentage of total government expenditures on mental health, in %",
        backgroundColor: '#36a2eb'
    }, {
        label: "Average spend",
        data:wp_avg,
        type: 'line'
    }],
    labels: wp_countries
};
let afrBarChart = new Chart(ctx2, {
    data:afrData,
    type: 'bar',
    options: {
        maintainAspectRatio: false,
        responsive: false,
    }
});
let ameBarChart = new Chart(ctx3, {
    data:ameData,
    type: 'bar',
    options: {
        maintainAspectRatio: false,
        responsive: false,
    }
});
let emBarChart = new Chart(ctx4, {
    data:emData,
    type: 'bar',
    options: {
        maintainAspectRatio: false,
        responsive: false,
    }
});
let eurBarChart = new Chart(ctx5, {
    data:eurData,
    type: 'bar',
    options: {
        maintainAspectRatio: false,
        responsive: false,
    }
});
let seaBarChart = new Chart(ctx6, {
    data:seaData,
    type: 'bar',
    options: {
        maintainAspectRatio: false,
        responsive: false,
    }
});
let wpBarChart = new Chart(ctx7, {
    data:wpData,
    type: 'bar',
    options: {
        maintainAspectRatio: false,
        responsive: false,
    }
});

function getElements(){
    let afr = document.getElementById("afrDiv");
    let ame = document.getElementById("ameDiv");
    let em = document.getElementById("emDiv");
    let eur = document.getElementById("eurDiv");
    let sea = document.getElementById("seaDiv");
    let wp = document.getElementById("wpDiv");
    return [afr, ame, em, eur, sea, wp];
}

function afr() {
    divs = getElements();

    divs[0].style.display = "inline";
    divs[1].style.display = "none";
    divs[2].style.display = "none";
    divs[3].style.display = "none";
    divs[4].style.display = "none";
    divs[5].style.display = "none";
}
function ame() {
    divs = getElements();

    divs[0].style.display = "none";
    divs[1].style.display = "inline";
    divs[2].style.display = "none";
    divs[3].style.display = "none";
    divs[4].style.display = "none";
    divs[5].style.display = "none";
}
function em() {
    divs = getElements();

    divs[0].style.display = "none";
    divs[1].style.display = "none";
    divs[2].style.display = "inline";
    divs[3].style.display = "none";
    divs[4].style.display = "none";
    divs[5].style.display = "none";
}
function eur() {
    divs = getElements();

    divs[0].style.display = "none";
    divs[1].style.display = "none";
    divs[2].style.display = "none";
    divs[3].style.display = "inline";
    divs[4].style.display = "none";
    divs[5].style.display = "none";
}
function sea() {
    divs = getElements();

    divs[0].style.display = "none";
    divs[1].style.display = "none";
    divs[2].style.display = "none";
    divs[3].style.display = "none";
    divs[4].style.display = "inline";
    divs[5].style.display = "none";
}
function wp() {
    divs = getElements();

    divs[0].style.display = "none";
    divs[1].style.display = "none";
    divs[2].style.display = "none";
    divs[3].style.display = "none";
    divs[4].style.display = "none";
    divs[5].style.display = "inline";
}
