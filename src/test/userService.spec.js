const { usuarioExiste, emailExiste } = require('../services/userService');

const { testeDB } = require('../config/database');

describe('Probando la función emailExiste de userService', () => {
    it('debe retornar FALSE para email inválido', () => {
        const email = 'invalido@mail.com';
        expect(emailExiste(email, testeDB)).toBe(false);
    });
    it('debe retornar FALSE para email inexistente', () => {
        const email = undefined;
        expect(emailExiste(email, testeDB)).toBe(false);
    });

    it('debe retornar FALSE para email vacío', () => {
        const email = '';
        expect(emailExiste(email, testeDB)).toBe(false);
    });

    it('debe retornar TRUE para email válido', () => {
        const email = 'valido@mail.com';
        expect(emailExiste(email, testeDB)).toBe(true);
    });
});


describe('Probando la función usuarioExiste de userService', () => {
    it('debe retornar FALSE para email inexistente', () => {
        const email = undefined;
        const password = 123456;
        expect(usuarioExiste(email, password, testeDB)).toBe(false);
    });

    it('debe retornar FALSE para email inválido', () => {
        const email = 'invalido@mail.com';
        const password = 123456;
        expect(usuarioExiste(email, password, testeDB)).toBe(false);
    });
    it('debe retornar TRUE para email válido', () => {
        const email = 'valido@mail.com';
        const password = 123456;
        expect(usuarioExiste(email, password, testeDB)).toBe(true);
    });

    it('debe retornar FALSE para contraseña inexistente', () => {
        const email = 'valido@mail.com';
        const password = undefined;
        expect(usuarioExiste(email, password, testeDB)).toBe(false);
    });

    it('debe retornar FALSE para contraseña inválida', () => {
        const email = 'valido@mail.com';
        const password = 'password_invalida';
        expect(usuarioExiste(email, password, testeDB)).toBe(false);
    });

    it('debe retornar TRUE para contraseña válida', () => {
        const email = 'valido@mail.com';
        const password = 123456;
        expect(usuarioExiste(email, password, testeDB)).toBe(true);
    });

    it('debe ejecutarse en menos de 1 milisegundo para un email existente', () => {
        const email = 'valido@mail.com';
        const password = 123456;

        const start = Date.now();
        usuarioExiste(email, password, testeDB);
        const end = Date.now();

        expect(end - start).toBeLessThan(1);
    });

});