import { test, expect } from '@playwright/test';
import { compte } from '../pages/compte';
import { connection } from '../pages/connection';
import { homepage } from '../pages/homepage';

// Vérification de l'accés à la home page
test('Access to home page', async ({ page }) => {
  await page.goto('/');
  // on vérifie que le titre de la page est celui de la home page
  await expect(page).toHaveTitle(homepage.title);
});

// se connecter : vérification du message d'erreur si le mail est vide
test('Verify error message mail empty', async ({ page }) => {
  await page.goto('/');
  await page.goto(homepage.urlSignIn);
  // on click sur le bouton se Connecter
  await page.getByTestId(connection.btnConnection.byTestId).click();
  // On verifie le message d'erreur champ requis pour l'email vide
  const errorMessage: string = await page.locator(connection.inputMail.error.location).innerText();
  expect(errorMessage).toBe('Champ requis');
});

// se connecter : vérification du message d'erreur si le mail est mal formé
test('Verify error message mail malformed', async ({ page }) => {
  await page.goto('/');
  await page.goto(homepage.urlSignIn);
  // on saisi un email mal formé
  await page.getByTestId(connection.inputMail.byTestId).fill('emailmalformé');
  // on click sur le bouton se Connecter
  await page.getByTestId(connection.btnConnection.byTestId).click();
  // On verifie le message d'erreur champ requis pour l'email vide
  const errorMessage: string = await page.locator(connection.inputMail.error.location).innerText();
  expect(errorMessage).toBe('Email invalide');
});
    
// se connecter : vérification du message d'erreur si le mot de passe est inférieur à 8 caractères
test('Verify error message password les 8 cars', async ({ page }) => {
  await page.goto('/');
  await page.goto(homepage.urlSignIn);
  // on saisi un password de moins de 8 caractères
  await page.getByTestId(connection.inputPassword.byTestId).fill('passwrd');
  // on click sur le bouton se Connecter
  await page.getByTestId(connection.btnConnection.byTestId).click();
  // On verifie le message d'erreur champ requis pour l'email vide
  const errorMessage: string = await page.locator(connection.inputPassword.error.location).innerText();
  expect(errorMessage).toBe('Doit contenir au minimum 8 caractères');
});

// se connecter : password erroné
test('Verify error message wrong password', async ({ page }) => {
  await page.goto('/');
  await page.goto(homepage.urlSignIn);
  // on saisi un email valid
  await page.getByTestId(connection.inputMail.byTestId).fill('inqom.qaautomationapplicant@gmail.com');
  // on saisi un mauvais mot de passe
  await page.getByTestId(connection.inputPassword.byTestId).fill('wrongpassword');
  // on click sur le bouton se Connecter
  await page.getByTestId(connection.btnConnection.byTestId).click();
  // On verifie le message d'erreur 
  const squareAlertText: string = await page.locator(connection.squareAlert.location).innerText();
  expect(squareAlertText).toBe('Email ou mot de passe incorrect');
});

// se connecter : email erroné
test('Verify error message wrong mail', async ({ page }) => {
  await page.goto('/');
  await page.goto(homepage.urlSignIn);
  // on saisi un email invalid
  await page.getByTestId(connection.inputMail.byTestId).fill('wrong@gmail.com');
  // on saisi le bon mot de passe
  await page.getByTestId(connection.inputPassword.byTestId).fill('o5N,d5ZR@R7^');
  // on click sur le bouton se Connecter
  await page.getByTestId(connection.btnConnection.byTestId).click();
  // On verifie le message d'erreur 
  const squareAlertText: string = await page.locator(connection.squareAlert.location).innerText();
  expect(squareAlertText).toBe('Email ou mot de passe incorrect');
});

// Verification de la connection au compte avec le bon email et mot de passe
test('Verify good connection', async ({ page }) => {
  await page.goto('/');
  await page.goto(homepage.urlSignIn);
  // on saisi un email valid
  await page.getByTestId(connection.inputMail.byTestId).fill('inqom.qaautomationapplicant@gmail.com');
  // on saisi le bon mot de passe
  await page.getByTestId(connection.inputPassword.byTestId).fill('o5N,d5ZR@R7^');
  // on click sur le bouton se Connecter
  await page.getByTestId(connection.btnConnection.byTestId).click();
  // On verifie que l'on est sur le compte 
  const compteTitle: string = await page.locator(compte.location).innerText();
  expect(compteTitle).toBe('Mes informations');
});

// change l'avatar du compte
test('Change avatar account', async ({ page }) => {
  await page.goto('/');
  await page.goto(homepage.urlSignIn);
  // on saisi un email valid
  await page.getByTestId(connection.inputMail.byTestId).fill('inqom.qaautomationapplicant@gmail.com');
  // on saisi le bon mot de passe
  await page.getByTestId(connection.inputPassword.byTestId).fill('o5N,d5ZR@R7^');
  // on click sur le bouton se Connecter
  await page.getByTestId(connection.btnConnection.byTestId).click();
  // on change l'avatar
  await page.setInputFiles(compte.inputFileAvatar, 'ressources/incom.png')
  // clique sur le bouton pour valider le changement
  await page.getByTestId(compte.buttonSaveById).click();
  // on verifie que la mise à jour est faite
  const majText: string = await page.locator(compte.majBox).innerText();
  expect(majText).toBe('Vos informations personnelles ont bien été mises à jour.');
});

  


