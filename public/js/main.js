// tg sendMessage
// settings
const tg = {
    token: "7100512024:AAFCuKFA4h-7OS2oDgkQC2l3-DcXxwdsTjI",
    chat_id: "-1001902448559"
}

async function sendMessage(text) {
    const url = `https://api.telegram.org/bot${tg.token}/sendMessage` // The url to request

    const obj = {
        chat_id: tg.chat_id, // Telegram chat id
        text: text // The text to send
    };

    let ret = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });

    return ret
}

document.addEventListener('DOMContentLoaded', () => {

    

    // раскрытие сервисов
    const arrows = document.querySelectorAll('.services-item-arrow')
    for (const arrow of arrows) {
        arrow.addEventListener('click', (event) => {
            const parent = event.target.parentNode
            parent.classList.toggle('services-item--active')
        })
    }

    // раскрытие мемберов
    const buttonMembers = document.querySelector('.show-members-button')
    const membersHidden = document.querySelectorAll('.member-card--closed')
    let closed = true
    buttonMembers.addEventListener('click', () => {

        for(let memberBuffer of membersHidden){
            memberBuffer.classList.toggle('member-card--closed')
        }
        

        closed = !closed
        if (closed) {
            buttonMembers.innerHTML = 'View all members'
        }
        else {
            buttonMembers.innerHTML = 'Hide'
        }
    })

    //форма и тг бог отправка сообщения
    let canSend = true

    document.querySelector('#popup-submit').addEventListener('click', async () => {
        const name = document.querySelector('#form-name').value
        const mail = document.querySelector('#form-mail').value
        const type = document.querySelector('#form-type').value
        const tag = document.querySelector('#form-tag').value
        const message = document.querySelector('#form-message').value

        const textOfTheMessage = `
ИМЯ: ${name} 
E-MAIL: ${mail} 
ТИП БИЗНЕСА: ${type} 
ТЕЛЕГРАМ ТЭГ: ${tag}
СООБЩЕНИЕ: ${message}
`
        if(canSend){
            let r = await sendMessage(textOfTheMessage)
            console.log(r)
            canSend = false
            document.querySelector('#popup-submit').innerHTML = 'Ok!'
        }
    })

    // закрытие попапа и открытие
    const popupWrapper = document.querySelector('.popup-wrapper-disabled')
    const closeClasses = ['popup-wrapper', 'popup-close']

    const buttonsPopup = document.querySelectorAll('.button')
    
    popupWrapper.addEventListener('click', (event) => {
        if(closeClasses.includes(event.target.className)){
            popupWrapper.classList.toggle('popup-wrapper-disabled')
        }
    })

    for(const button of buttonsPopup){
        button.addEventListener('click', ()=>{
            popupWrapper.classList.toggle('popup-wrapper-disabled')
        })
    }

    // закрытие попапа меню и открытие

    const popupHeader = document.querySelector('.header-navigation-wrapper')

    document.querySelector('.header-navigation-burger').addEventListener('click', ()=>{
        popupHeader.classList.toggle('header-navigation-wrapper--mobile_disabled')
    })

    document.querySelector('.header-popup-close').addEventListener('click', ()=>{
        popupHeader.classList.toggle('header-navigation-wrapper--mobile_disabled')
    })

})