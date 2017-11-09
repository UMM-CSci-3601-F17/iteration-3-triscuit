// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    envName: 'dev',
    production: false,
    firebase: {
        apiKey: "AIzaSyDvsjiDFeUOGn1a2w_mUb7G4_W8XwQzszo",
        authDomain: "iteration-3-triscuit.firebaseapp.com",
        databaseURL: "https://iteration-3-triscuit.firebaseio.com",
        projectId: "iteration-3-triscuit",
        storageBucket: "iteration-3-triscuit.appspot.com",
        messagingSenderId: "1018884495900"
    }
    // firebase: {
    //     apiKey: "AIzaSyCXnDgY8NA3167LzIXE72kymVY8ftF5K3Y",
    //     authDomain: "test-vipul-sage.firebaseapp.com",
    //     databaseURL: "https://test-vipul-sage.firebaseio.com",
    //     projectId: "test-vipul-sage",
    //     storageBucket: "test-vipul-sage.appspot.com",
    //     messagingSenderId: "82160205434"
    // }
};
