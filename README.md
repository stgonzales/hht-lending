# HHT Lending App

Created: Jul 2, 2020 5:34 AM

Created By: Stephen Goncalves

Last Edited By: Stephen Goncalves

Last Edited Time: Jul 2, 2020 6:26 AM

Property: Stephen Goncalves

Status: In Progress 🙌

Type: Project Kickoff 🚀


# Overview

What is the project? Why are we working on this? .

The handheld terminal app brings simplicity and security for non-technical users, ensuring that the inputs have inserted accurately and the exported output readable in a 3rd part software. The handheld terminal app idea came up when observing the processes in the existing software(Excel), and there are several gaps for a non-technical user see or edit.

The goal is to create a very straight forward process where non-technical users will have to follow, closing all gaps and chances to modify and break the app.

### Problem Statement

- **User is able to modify:**
    - Tabs name
    - Sheet style
    - Output sheet
    - Save as non-standard file
    - Insert non-numeric character

### Proposed Solution

- Input Validation
- Reduce to two editable fields (HHT Number and User Number)
- Validate if the handheld terminal is available or not
- Generate a `.csv` file to be used for any other purpose with Excel or any `.csv` edit software.

# User Stories

What will the user be able to do after the solution is shipped? 

- [x]  User have to be able to type in the Handheld Terminal number.
- [x]  User have to be able to type in the User number.
- [ ]  Validate the input for **ONLY NUMBERS**
- [x]  After type in HHT number and User number, have to be able to click on the button **'OUT'** to register the lending.
- [ ]  Validate if the HHT is available.
- [x]  User have to be able to click the button **'IN'** to receive back the HHT
- [x]  Store data in a `.csv` file.

# Screenshots

![Main Screen](/screenshots/main_screen.png?raw=true "Main Screen")
