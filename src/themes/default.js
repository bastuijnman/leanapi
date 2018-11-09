import { createMuiTheme } from '@material-ui/core/styles';

import blueGray from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';

export default createMuiTheme({

    palette: {

        primary: {
            main: blueGray[900]
        },

        secondary: {
            main: grey[100]
        }

    }

});
