document.querySelectorAll('.card').forEach($card => {
    $card.onclick = function(){
        document.querySelectorAll('.input-conversion').forEach(input => {
            input.textContent = '';
        })
        const active = document.querySelector('.active');
        if(active){
            active.classList.remove('active');
        }
        $card.classList.add('active');
        $card.querySelector('.currency').onclick = function(e){
            e.stopPropagation();
        }
        $card.querySelector('img').onclick = function(e){
            e.stopPropagation();
        }
        if(document.contains(document.querySelector('input'))){
            document.querySelector('input').remove();
        }
        createInput($card);
        CHOSEN_CURRENCY = $card.id.toUpperCase();
        fetch(`https://api.exchangerate.host/latest?base=${CHOSEN_CURRENCY}`)
            .then(response => response.json())
            .then(responseJSON => {
                document.querySelectorAll('.unit-conversion').forEach(unit => {
                    const convertedCurrency = unit.parentNode.id.toUpperCase();
                    unit.textContent = `1 ${CHOSEN_CURRENCY} = ${responseJSON.rates[convertedCurrency]} ${convertedCurrency}`;
                })
                document.querySelector('input').onkeyup = function(){
                    const validCharacters = /^[0-9]+$|^[0-9]+\.?[0-9]+$/
                    let INPUT_VALUE = Number(document.querySelector('input').value);
                    if(validCharacters.test(INPUT_VALUE)){
                        document.querySelectorAll('.card').forEach($card => {
                            fetch(`https://api.exchangerate.host/convert?from=${CHOSEN_CURRENCY}&to=${$card.id.toUpperCase()}&amount=${INPUT_VALUE}`)
                                .then(response => response.json())
                                .then(responseJSON => {
                                    if(CHOSEN_CURRENCY === $card.id.toUpperCase()){
                                        return;
                                    }
                                    if(INPUT_VALUE === 0){
                                        document.querySelectorAll('.input-conversion').forEach(output => {
                                            output.textContent = '';
                                        })
                                        return;
                                    }
                                    $card.querySelector('.input-conversion').textContent = `${Number.parseFloat(responseJSON.result).toFixed(2)} ${$card.id.toUpperCase()}`;
                                })
                        })
                    }
                }
                $card.querySelector('.unit-conversion').textContent = '';
            })
    }
})

function createInput(target){
    const input = document.createElement('input');
    input.type = 'number';    
    target.appendChild(input);
    input.onclick = function(e){
        e.stopPropagation();
    } 
}
