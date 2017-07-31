function generateRef(ano, mes, dia, userId) {
    if (dia == null) {
        return '/pontual/' + ano + '/' + mes;
    }
    return '/pontual/' + ano + '/' + mes + '/' + dia + '/' + userId;
}

function lerHorarios(callback) {
    var hoje = new Date();
    var ano = hoje.getFullYear();
    var mes = (hoje.getMonth() + 1) < 10 ? '0'+ (hoje.getMonth() + 1) :'' + (hoje.getMonth() + 1);
    var dia = hoje.getDate();

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
    var hoje = new Date();
    var ano = hoje.getFullYear();
    var mes = (hoje.getMonth() + 1) < 10 ? '0'+ (hoje.getMonth() + 1) :'' + (hoje.getMonth() + 1);
    var dia = hoje.getDate();

<<<<<<< HEAD
    var horaAtual = Object.assign({}, horarios);

    if (horarios.entrada == 0) {
        horaAtual.entrada = Date.now();
        document.getElementById('registrar-horario-btn').textContent = "Intervalo";
        document.getElementById('registrar-horario-btn').disabled = false;
    } else if (horarios.entrada != 0 && horarios.saidaAlmoco == 0) {
        horaAtual.saidaAlmoco = Date.now();
        document.getElementById('registrar-horario-btn').textContent = "Retorno";
        document.getElementById('registrar-horario-btn').disabled = false;
    } else if (horarios.entrada != 0 && horarios.saidaAlmoco != 0 && horarios.entradaAlmoco == 0) {
        horaAtual.entradaAlmoco = Date.now();
        document.getElementById('registrar-horario-btn').textContent = "Saída";
        document.getElementById('registrar-horario-btn').disabled = false;
    } else if (horarios.entrada != 0 && horarios.saidaAlmoco != 0 && horarios.entradaAlmoco != 0 && horarios.saida == 0) {
        horaAtual.saida = Date.now();
        document.getElementById('registrar-horario-btn').disabled = false;
        document.getElementById('registrar-horario-btn').style.display = "none";
=======
    console.log('horarios: ' + horarios.entrada);
    console.log('horarios: ' + horarios.saidaAlmoco);
    console.log('horarios: ' + horarios.entradaAlmoco);
    console.log('horarios: ' + horarios.saida);

    var horaAtual = Object.assign({}, horarios);

    if (horaAtual.entrada == 0) {
        horaAtual.entrada = Date.now()
        var theDiv = document.createElement('div');
        theDiv.setAttribute("id", 'dia-'+dia);
        theDiv.setAttribute('class', 'dia');
        theDiv.innerHTML = '<div>'+dia+'/'+mes+'/'+ano+'</div>'+
                            '<div>'+horaAtual.entrada+'</div>'+
                            '<div></div>'+
                            '<div></div>'+
                            '<div></div>';
        console.log(theDiv);
        document.getElementById('pontos').appendChild(theDiv);
    } else if (horaAtual.entrada != 0 && horaAtual.saidaAlmoco == 0) {
        horaAtual.saidaAlmoco = Date.now();
    } else if (horaAtual.entrada != 0 && horaAtual.saidaAlmoco != 0 && horaAtual.entradaAlmoco == 0) {
        horaAtual.entradaAlmoco = Date.now();
    } else if (horaAtual.entrada != 0 && horaAtual.saidaAlmoco != 0 && horaAtual.entradaAlmoco != 0 && horaAtual.saida == 0) {
        horaAtual.saida = Date.now();
    } else if (horaAtual.entrada != 0 && horaAtual.saidaAlmoco != 0 && horaAtual.entradaAlmoco != 0 && horaAtual.saida != 0) {
>>>>>>> 3119ac8443ce8fcc6847981ff125091ea8920b99
    }

    var userId = firebase.auth().currentUser.uid;
    var refString = generateRef(ano, mes, dia, userId);
    var updates = {};
    updates[refString] = horaAtual;
<<<<<<< HEAD
    loadMonthDays(listUserDays);
=======
>>>>>>> 3119ac8443ce8fcc6847981ff125091ea8920b99
    return firebase.database().ref().update(updates);
}

// Quando o botao eh clicado, faz o request ao database (usando `lerHorarios()`) e processa os resultados (usando `registraHorarios()`)
function onButtonClick() {
<<<<<<< HEAD
    document.getElementById('registrar-horario-btn').disabled = true;
    lerHorarios(registraHorarios);
}

function updateUserInterface() {
    //inicializa quando a página principal é aberta
=======
    lerHorarios(registraHorarios);
}


function updateUserInterface() {
>>>>>>> 3119ac8443ce8fcc6847981ff125091ea8920b99
    lerHorarios(modificaElementos);
    loadMonthDays(listUserDays);
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
<<<<<<< HEAD
=======

>>>>>>> 3119ac8443ce8fcc6847981ff125091ea8920b99
    var hoje = new Date();
    var ano = hoje.getFullYear();
    var mes = (hoje.getMonth() + 1) < 10 ? '0'+ (hoje.getMonth() + 1) :'' + (hoje.getMonth() + 1);
    var dia = hoje.getDate();
    
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
<<<<<<< HEAD
=======

>>>>>>> 3119ac8443ce8fcc6847981ff125091ea8920b99
    var hoje = new Date();
    var ano = hoje.getFullYear();
    var mes = (hoje.getMonth() + 1) < 10 ? '0'+ (hoje.getMonth() + 1) :'' + (hoje.getMonth() + 1);
    var userId = firebase.auth().currentUser.uid;
    var conteudoHtml = '';
    
    //console.log(usersDays);
    for (var dia in usersDays) { // dia e objeto
<<<<<<< HEAD
=======
        //if (usersDays.hasOwnProperty(dia)) {
>>>>>>> 3119ac8443ce8fcc6847981ff125091ea8920b99
        var listaHorariosDoDia = usersDays[dia];
        conteudoHtml += '<div id="dia-'+dia+'" class="dia">';
        for (var user in listaHorariosDoDia ) { // usuário e objeto
            var hora = listaHorariosDoDia[user];
            if (user == userId) {
                conteudoHtml += '<div>'+dia+'/'+mes+'/'+ano+'</div>';
<<<<<<< HEAD
                conteudoHtml += '<div>'+ (hora.entrada != 0 ? moment.unix(moment(hora.entrada).unix()).format('HH:mm:ss') : "-") +'</div>';
                conteudoHtml += '<div>'+ (hora.saidaAlmoco != 0 ? moment.unix(moment(hora.saidaAlmoco).unix()).format('HH:mm:ss') : "-") +'</div>';
                conteudoHtml += '<div>'+ (hora.entradaAlmoco != 0 ? moment.unix(moment(hora.entradaAlmoco).unix()).format('HH:mm:ss') : "-") +'</div>';
                conteudoHtml += '<div>'+ (hora.saida != 0 ? moment.unix(moment(hora.saida).unix()).format('HH:mm:ss') : "-") +'</div>';
            }
        }
        conteudoHtml += '</div>';
=======
                for (var momento in hora) { // momento (entrada/almoco/retorno/saida)
                    conteudoHtml += '<div>'+hora[momento]+'</div>';
                }
            }
        }
        conteudoHtml += '</div>';
        //}
>>>>>>> 3119ac8443ce8fcc6847981ff125091ea8920b99
    }
    document.getElementById('pontos').innerHTML = conteudoHtml;
}