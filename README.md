npm run rionizMuiConvertor -- --version dev
npx rionizkeycloakify eject-page --pages all

FIX generator bug and fix all styles


replacor 


{/*<TextField*/}
{/*    tabIndex={5}*/}
{/*    name="rememberMe"*/}
{/*    type="checkbox"*/}
{/*    defaultChecked={!!login.rememberMe}*/}
{/*    id="Login_TextField_3"*/}
{/*    sx={styles.Login_TextField_3}*/}
{/*/>*/}
<Checkbox
tabIndex={5}
name="rememberMe"
type="checkbox"
defaultChecked={!!login.rememberMe}
id="Login_TextField_3"
sx={styles.Login_TextField_3}
/>



 {/*<TextField*/}
{/*    tabIndex={7}*/}
{/*    disabled={isLoginButtonDisabled}*/}
{/*    name="login"*/}
{/*    type="submit"*/}
{/*    value={msgStr("doLogIn")}*/}
{/*    id="Login_TextField_5"*/}
{/*    sx={styles.Login_TextField_5}*/}
{/*/>*/}
<Button
    name="login"
    tabIndex={7}
    disabled={isLoginButtonDisabled}
    type="submit"
    id="Login_TextField_5"
    sx={styles.Login_TextField_5}
    fullWidth={true}
>
    {msgStr("doLogIn")}
</Button>


Add 

label={msg("password")}
fullWidth={true}
for inputs use formlabel





{realm.internationalizationEnabled && (assert(locale !== undefined), locale.supported.length > 1) && (
<Box id="Template_Box_2" sx={styles.Template_Box_2}>
<Button id="kc-current-locale-link" onClick={handleMenuOpen}>
{labelBySupportedLanguageTag[currentLanguageTag]}
</Button>
<Menu
id="Template_Button_1"
aria-label={msgStr("languages")}
aria-controls="language-switch1"
tabIndex={1}
sx={styles.Template_Button_1}
anchorEl={anchorEl} // Handle menu anchor position
open={Boolean(anchorEl)}
onClose={handleMenuClose} // Close the menu on selection or click outside
>
{locale.supported.map(({ languageTag }, i) => (
<MenuItem
key={languageTag}
id="Template_ListItem_1"
sx={styles.Template_ListItem_1}
onClick={() => handleLocaleChange(languageTag)} // Handle locale change
>
<Link role="menuitem" href={getChangeLocaleUrl(languageTag)} id="Template_Link_1" sx={styles.Template_Link_1}>
{labelBySupportedLanguageTag[languageTag]}
</Link>
</MenuItem>
))}
</Menu>
</Box>
)}