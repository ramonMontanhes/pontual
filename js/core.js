let diaServerGoogle;
// Quando o botao eh clicado, faz o request ao database (usando `lerHorarios()`) e processa os resultados (usando `registraHorarios()`)
function onButtonClick() {
    document.getElementById('registrar-horario-btn').disabled = true;
    lerHorarios(registraHorarios);
}

// Carrega junto da página principal da aplicação
function updateUserInterface() {
    retornaDia(exibeDia);
}

// Retorna o caminho onde está sendo gravada a informação
function generateRef(ano, mes, dia, userId) {
    if (dia == null) {
        return '/pontual/' + ano + '/' + mes;
    }
    return '/pontual/' + ano + '/' + mes + '/' + dia + '/' + userId;
}

function retornaDia(callback) {
    let diaPromise = new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('GET', "https://script.google.com/macros/s/AKfycbziu3-P52xSkG7kYaWpTV6vMPRV4JFqX8hxjZZhsZDe_AfPGhc/exec?tz=America/Fortaleza");
        request.onload = function() {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject('Página carregou, mas houve algum erro.');
            }
        };
        request.onerror = function() {
            reject('Erro na obtenção do dia.')
        }
        request.send();
    });
    diaPromise.then(function(result){
        callback(result);
    }, function(result){
        console.log('erro na consulta');
    });
}

function exibeDia(result) {
    result = diaAtualServer = JSON.parse(result);
    let dataServerHoje = result.day+'/'+result.month+'/'+result.year;
    let dataHojeBanco;
    let dataBanco = firebase.database().ref('/pontual/data/');
    dataBanco.once('value').then(function(snapshot) {
        dataHojeBanco = snapshot.val().hoje;
        if(dataServerHoje == moment.unix(moment(dataHojeBanco).unix()).format('D/M/YYYY')){
            diaServerGoogle = dataHojeBanco; // pegando a data em milesegundos para usar nas demais funções
            lerHorarios(modificaElementos);
            loadMonthDays(listUserDays);
        } else {
            let dataHojeParaBanco = moment([result.year, result.month-1, result.day]).format('x');            
            let setarDataHoje = firebase.database().ref('/pontual/data/').set({
                hoje: parseInt(dataHojeParaBanco)
            });
            retornaDia(exibeDia);
        }
    });
}

function lerHorarios(callback) {
    var hoje = new Date(diaServerGoogle);
    var ano = hoje.getFullYear();
    var mes = (hoje.getMonth() + 1) < 10 ? '0' + (hoje.getMonth() + 1) :'' + (hoje.getMonth() + 1);
    var dia = hoje.getDate() < 10 ? '0' + hoje.getDate() : '' + hoje.getDate();
    //console.log('------------------->>>>>>>> ' + hoje + " - " + ano + " - " + mes + " - " + dia);
    var currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        console.error("Not logged in.");
        return;
    }
    var userId = firebase.auth().currentUser.uid;
    var refString = generateRef(ano, mes, dia, userId);

    return firebase.database()
        .ref(refString)
        .once('value')
        .then(function(snapshot) {
            var result = {
                entrada: 0,
                saidaAlmoco: 0,
                entradaAlmoco: 0,
                saida: 0,
            };
            var val = snapshot.val();
            if (val) {
                result.entrada = val.entrada;
                result.saidaAlmoco = val.saidaAlmoco;
                result.entradaAlmoco = val.entradaAlmoco;
                result.saida = val.saida;
            }
            callback(result);
        });
};

//Registra os horarios de entradas e saidas
function registraHorarios(horarios) {
    var hoje = new Date(diaServerGoogle);
    var ano = hoje.getFullYear();
    var mes = (hoje.getMonth() + 1) < 10 ? '0' + (hoje.getMonth() + 1) :'' + (hoje.getMonth() + 1);
    var dia = hoje.getDate() < 10 ? '0' + hoje.getDate() : '' + hoje.getDate();
    var horaAtual = Object.assign({}, horarios);
    if (horarios.entrada == 0) {
        horaAtual.entrada = firebase.database.ServerValue.TIMESTAMP;
        document.getElementById('registrar-horario-btn').textContent = "Intervalo";
        document.getElementById('registrar-horario-btn').disabled = false;
    } else if (horarios.entrada != 0 && horarios.saidaAlmoco == 0) {
        horaAtual.saidaAlmoco = firebase.database.ServerValue.TIMESTAMP;
        document.getElementById('registrar-horario-btn').textContent = "Retorno";
        document.getElementById('registrar-horario-btn').disabled = false;
    } else if (horarios.entrada != 0 && horarios.saidaAlmoco != 0 && horarios.entradaAlmoco == 0) {
        horaAtual.entradaAlmoco = firebase.database.ServerValue.TIMESTAMP;
        document.getElementById('registrar-horario-btn').textContent = "Saída";
        document.getElementById('registrar-horario-btn').disabled = false;
    } else if (horarios.entrada != 0 && horarios.saidaAlmoco != 0 && horarios.entradaAlmoco != 0 && horarios.saida == 0) {
        horaAtual.saida = firebase.database.ServerValue.TIMESTAMP;
        document.getElementById('registrar-horario-btn').disabled = false;
        document.getElementById('registrar-horario-btn').style.display = "none";
    }
    var userId = firebase.auth().currentUser.uid;
    var refString = generateRef(ano, mes, dia, userId);
    var updates = {};
    updates[refString] = horaAtual;
    loadMonthDays(listUserDays);
    return firebase.database().ref().update(updates);
}

function modificaElementos(horarios) {
    if (horarios.entrada == 0) {
    } else if (horarios.entrada != 0 && horarios.saidaAlmoco == 0) {
        document.getElementById('registrar-horario-btn').textContent = "Intervalo";
    } else if (horarios.entrada != 0 && horarios.saidaAlmoco != 0 && horarios.entradaAlmoco == 0) {
        document.getElementById('registrar-horario-btn').textContent = "Retorno";
    } else if (horarios.entrada != 0 && horarios.saidaAlmoco != 0 && horarios.entradaAlmoco != 0 && horarios.saida == 0) {
        document.getElementById('registrar-horario-btn').textContent = "Saída";
    } else if (horarios.entrada != 0 && horarios.saidaAlmoco != 0 && horarios.entradaAlmoco != 0 && horarios.saida != 0) {
        document.getElementById('registrar-horario-btn').style.display = "none";
    }
}

function loadMonthDays(callback) {
    var hoje = new Date(diaServerGoogle);
    var ano = hoje.getFullYear();
    var mes = (hoje.getMonth() + 1) < 10 ? '0' + (hoje.getMonth() + 1) :'' + (hoje.getMonth() + 1);
    var dia = hoje.getDate() < 10 ? '0' + hoje.getDate() : '' + hoje.getDate();    
    var currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        console.error("Not logged in.");
        return;
    }
    var userId = firebase.auth().currentUser.uid;
    var refString = generateRef(ano, mes, null, userId);

    return firebase.database()
        .ref(refString)
        .once('value')
        .then(function(snapshot) {
            var val = snapshot.val();
            callback(val);
        });
}

function listUserDays(usersDays) {
    var hoje = new Date(diaServerGoogle);
    var ano = hoje.getFullYear();
    var mes = (hoje.getMonth() + 1) < 10 ? '0' + (hoje.getMonth() + 1) :'' + (hoje.getMonth() + 1);
    var userId = firebase.auth().currentUser.uid;
    var conteudoHtml = '';
    
    //console.log(usersDays);
    for (var dia in usersDays) { // dia e objeto
        var listaHorariosDoDia = usersDays[dia];
        conteudoHtml += '<div id="dia-'+dia+'" class="dia">';
        for (var user in listaHorariosDoDia ) { // usuário e objeto
            var hora = listaHorariosDoDia[user];
            if (user == userId) {
                conteudoHtml += '<div>'+dia+'/'+mes+'/'+ano+'</div>';
                conteudoHtml += '<div>'+ (hora.entrada != 0 ? moment.unix(moment(hora.entrada).unix()).format('HH:mm:ss') : "-") +'</div>';
                conteudoHtml += '<div>'+ (hora.saidaAlmoco != 0 ? moment.unix(moment(hora.saidaAlmoco).unix()).format('HH:mm:ss') : "-") +'</div>';
                conteudoHtml += '<div>'+ (hora.entradaAlmoco != 0 ? moment.unix(moment(hora.entradaAlmoco).unix()).format('HH:mm:ss') : "-") +'</div>';
                conteudoHtml += '<div>'+ (hora.saida != 0 ? moment.unix(moment(hora.saida).unix()).format('HH:mm:ss') : "-") +'</div>';
            }
        }
        conteudoHtml += '</div>';
    }
    document.getElementById('pontos').innerHTML = conteudoHtml;
}