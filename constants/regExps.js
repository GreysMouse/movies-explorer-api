const URL_REG_EXP = /^((https?:\/\/)(www\.)?([\w-]{1,256}\.)+[\w\-._~:/?#[\]@!$&'()*+,;=]*)$/;
const EMAIL_REG_EXP = /^([\w.!#$%&’*+/=?^`{|}~-]+@[-\w]+\.(\w)+)$/;

module.exports = { URL_REG_EXP, EMAIL_REG_EXP };
