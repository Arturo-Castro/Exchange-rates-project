const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD', 'SEK', 'KRW', 'SGD', 'NOK', 'MXN', 'INR', 'RUB', 'ZAR', 'ARS', 'BRL'];

document.querySelectorAll('.card').forEach($card => {
    $card.onclick = function(e){
        const active = document.querySelector('.active');
        if(active){
            active.classList.remove('active');
        }
        e.target.classList.add('active');
        document.querySelectorAll('p').forEach($p => {
            $p.onclick = function(e){
                e.stopPropagation();
            }
            if($p.className === 'currency'){
                return;
            }
            $p.textContent = '';
        })
        if(document.contains(document.querySelector('input'))){
            document.querySelector('input').remove();
        }
        createInput(e.target);
        CHOSEN_CURRENCY = e.target.id.toUpperCase();
        fetch(`https://api.exchangerate.host/latest?base=${CHOSEN_CURRENCY}`)
            .then(response => response.json())
            .then(responseJSON => {
                currencies.forEach(currency => {
                    document.querySelector(`#${currency.toLowerCase()}`).querySelector('.unit-conversion').textContent = `1 ${CHOSEN_CURRENCY} = ${responseJSON.rates[currency]} ${currency}`;
                    document.querySelector('input').onkeyup = function(e){
                        if(e.key == '1' || e.key == '2' || e.key == '3' || e.key == '4' || e.key == '5' || e.key == '6' || e.key == '7' || e.key == '8' || e.key == '9' || e.key == '0' || e.key == 'Backspace'){
                            let INPUT_VALUE = Number(document.querySelector('input').value);
                            document.querySelectorAll('.card').forEach($card => {
                                fetch(`https://api.exchangerate.host/convert?from=${CHOSEN_CURRENCY}&to=${$card.id.toUpperCase()}&amount=${INPUT_VALUE}`)
                                .then(response => response.json())
                                .then(responseJSON => {
                                    if(CHOSEN_CURRENCY === $card.id.toUpperCase()){
                                        return;
                                    } else if(INPUT_VALUE === 0){
                                        document.querySelectorAll('.input-conversion').forEach($p => {
                                            $p.textContent = '';
                                        })
                                        return;
                                    }
                                    $card.querySelector('.input-conversion').textContent = `${Number.parseFloat(JSON.stringify(responseJSON.result)).toFixed(2)} ${$card.id.toUpperCase()}`;
                                })
                            })
                        }
                    } 
                })
                e.target.querySelector('.unit-conversion').textContent = '';
            })
        
    }
})

function createInput(target){
    const input = document.createElement('input');
    input.type = 'number';    
    target.appendChild(input);
    document.querySelector('input').onclick = function(e){
        e.stopPropagation();
    }
}
