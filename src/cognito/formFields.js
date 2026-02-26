export const formFields = {
  signIn: {
    username: {
      label: "E-MAIL",
      placeholder: "seu@email.com",
    },
    password: {
      label: "SENHA",
      placeholder: "*********",
    },
  },

  signUp: {
    name: {
      label: "NOME COMPLETO",
      placeholder: "Seu nome completo",
      order: 1,
    },
    email: {
      label: "E-MAIL CORPORATIVO",
      placeholder: "seu@email.com",
      order: 2,
    },
    password: {
      label: "SENHA",
      placeholder: "*********",
      order: 2,
    },
    confirm_password: {
      label: "CONFIRMAR SENHA",
      placeholder: "*********",
      order: 3,
    },
    website: {
      label: "WEBSITE (Site da sua empresa)",
      placeholder: "https://www.seusite.com",
      order: 4,
    }
  },

  forceNewPassword: {
    password: {
      label: "Nova senha",
      placeholder: "Digite sua nova senha",
    },
  },

  forgotPassword: {
    username: {
      label: "E-mail",
      placeholder: "Digite o e-mail da sua conta",
    },
  },

  confirmResetPassword: {
    confirmation_code: {
      label: "Código de verificação",
      placeholder: "Digite o código enviado para seu e-mail",
    },
    confirm_password: {
      label: "Nova senha",
      placeholder: "Digite sua nova senha",
    },
  },

  setupTotp: {
    QR: {
      totpIssuer: "Chronos Pay",
      totpUsername: "Usuário",
    },
    confirmation_code: {
      label: "Código de verificação",
      placeholder: "Digite o código do aplicativo autenticador",
    },
  },

  confirmSignIn: {
    confirmation_code: {
      label: "Código de verificação",
      placeholder: "Digite o código recebido",
    },
  },

  setupEmail: {
    email: {
      label: "E-mail",
      placeholder: "Digite seu e-mail",
    },
  },
};
