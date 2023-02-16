

export const connection = {

    location : '#modal-content-home',
    squareAlert : {
        location : '//*[@alt=\'SquareAlert\']//parent::div//following-sibling::div'
    },
    inputMail : {
        byTestId : 'login-field-email',
        error : {
            location : '//*[@id=\'email_login\']//parent::div//following-sibling::div'
        }
    },
    inputPassword : {
        byTestId : 'login-field-password',
        error : {
            location : '//*[@id=\'password\']//parent::div//following-sibling::div/span',
            messageLessHeightCars : 'Doit contenir au minimum 8 caractères'
        }
    },
    btnConnection : {
        byTestId : 'login-button-submit'
    }
}