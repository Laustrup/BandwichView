renderHead();

function renderHead() {
    let head = `
        <!-- Head -->
        `;
    let endpoint = window.location.pathname.split('=')
    switch (endpoint[0]) {
        case "/welcome": {
            head += `
        <title id="head_title">BANDWICH</title>
        `;
            break;
        }
        case "/profile": {
            head += `
        <title id="head_title">BANDWICH - logged in</title>
        `;
            break;
        }
        case "/dashboard": {
            head += `
        <title id="head_title">BANDWICH - dashboard</title>
        `;
            break;
        }
        case "/?search_query": {
            head += `
        <title id="head_title">BANDWICH - search</title>
        `;
            break;
        }
        case "/?event": {
            head += `
        <title id="head_title">BANDWICH - event</title>
        `;
            break;
        }
        case "/?user": {
            head += `
        <title id="head_title">BANDWICH - user</title>
        `;
            break;
        }
        default: {
            head += `
        <title id="head_title">BANDWICH - error</title>
        `;
            break;
        }
    }
    head += `
        <link href="../static/images/shortcut_icon.PNG" type="image/PNG" rel="shortcut icon">
    `;
    document.getElementById("head_content").innerHTML = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <!-- Styles -->
        <link href="../static/styles/sheets/global.css" rel="stylesheet">
        <link href="../static/styles/sheets/fonts.css" rel="stylesheet">
        <link href="../static/styles/sheets/containers.css" rel="stylesheet">
        <link href="../static/styles/sheets/buttons.css" rel="stylesheet">
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Fredoka&display=swap" rel="stylesheet">
    
        ` + head;
}