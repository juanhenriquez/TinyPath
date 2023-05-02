import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

test('Dashboard layout toggling', async ({ page }) => {
  await page.goto('/dashboard');

  const tableLayoutButton = page.getByTestId('table-layout-button');
  const groupLayoutButton = page.getByTestId('group-layout-button');

  await expect(tableLayoutButton).toBeVisible();
  await expect(groupLayoutButton).toBeVisible();

  // By default the dashboard should be in table layout.
  await expect(page.getByTestId('links-table')).toBeVisible();

  // Click on the group layout button.
  await groupLayoutButton.click();

  // Now the dashboard should be in group layout.
  await expect(page.getByTestId('links-group')).toBeVisible();
});

test('Link CRUD', async ({ page }) => {
  await page.goto('/dashboard');

  // #1 - Create a link.
  // ========================

  // Get a reference to the create link dialog button.
  const openCreateLinkDialogButton = page.getByRole('button', {
    name: 'Create Link',
  });

  // Check if the button is visible.
  await expect(openCreateLinkDialogButton).toBeVisible();

  // Click on the button to open the dialog.
  await openCreateLinkDialogButton.click();

  // Get a reference to the dialog's url input and name.
  const originalUrlInput = page.getByTestId('original-url-input');
  const urlNameInput = page.getByTestId('url-name-input');

  // Check if the inputs are visible.
  await expect(originalUrlInput).toBeVisible();
  await expect(urlNameInput).toBeVisible();

  // Type in the inputs.
  const uniqueId = faker.datatype.uuid();
  const linkName = `${faker.company.name()} ${uniqueId}`;
  await originalUrlInput.type(`https://www.google.com?search=${uniqueId}`);
  await urlNameInput.type(linkName);

  // Get a reference to the create link button.
  const createOrUpdateLinkButton = page.getByTestId(
    'create-or-update-link-button',
  );

  // Check if the button is visible.
  await expect(createOrUpdateLinkButton).toBeVisible();

  // Click on the button to create the link.
  await createOrUpdateLinkButton.click();

  // Wait for the response to the create link request.
  const response = await page.waitForResponse(
    response =>
      response.request().method() === 'POST' &&
      response.url().includes('/api/links') &&
      response.status() === 200,
  );

  const newLinkData = await response.json();
  const newLinkId = newLinkData.link.id;

  // Check if the link is created and is within the table view by checking the
  // existence of the edit button.
  const editButton = page.getByTestId(`edit-link-button-${newLinkId}`);
  await expect(editButton).toBeVisible();

  // Click on the edit button to open the edit link page.
  await editButton.click();

  await page.waitForURL(`/links/${newLinkId}`);

  // #2 - Update the link.
  // ========================

  // Get a reference to the edit link dialog button.
  const openUpdateLinkDialogButton = page.getByRole('button', {
    name: 'Update Link',
  });

  // Open the edit link dialog.
  await openUpdateLinkDialogButton.click();

  // Type in the new values.
  const updatedLinkName = `${faker.company.name()} ${uniqueId}`;
  const updatedLinkUrl = `https://www.google.com?search-updated=${uniqueId}`;
  await originalUrlInput.fill(updatedLinkUrl);
  await urlNameInput.fill(updatedLinkName);

  // Click on the button to update the link.
  await createOrUpdateLinkButton.click();

  // Wait for the response to the create link request.
  const updatedLinkResponse = await page.waitForResponse(
    response =>
      response.request().method() === 'PUT' &&
      response.url().includes(`/api/links/${newLinkId}`),
  );

  const updatedLinkData = await updatedLinkResponse.json();

  await page.reload();

  expect(await page.getByTestId('link-uri-value').textContent()).toBe(
    updatedLinkData.link.uri,
  );
  expect(await page.getByTestId('link-name-value').textContent()).toBe(
    updatedLinkData.link.name,
  );

  // #3 - Delete the link.
  // ========================

  // Get a reference to the delete link dialog button.
  const openDeleteLinkDialogButton = page.getByTestId('delete-link-button');

  // Click the delete link button.
  await openDeleteLinkDialogButton.click();

  // Wait for the response to the delete link request.
  await page.waitForResponse(
    response =>
      response.request().method() === 'DELETE' &&
      response.url().includes(`/api/links/${newLinkId}`),
  );

  // The UI should redirect the user back to the dashboard.
  await page.waitForURL(`/dashboard`);

  // Check if the link is deleted by checking the existence of the edit button.
  console.log(page.getByTestId(`edit-link-button-${newLinkId}`));
  await expect(
    page.getByTestId(`edit-link-button-${newLinkId}`),
  ).not.toBeVisible();
});
