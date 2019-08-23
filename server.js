var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    expressSanatizer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");

mongoose.connect("mongodb://heroku_52cx7whb:hgehokhrvqnqii1bs6jhg4jj1p@ds141815.mlab.com:41815/heroku_52cx7whb", {
    useNewUrlParser: true,
    useFindAndModify: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSanatizer());


//Mongoose/Model config
var blogschema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});

var blog = mongoose.model("blog", blogschema);

// blog.create({
//     title: "TestBlog",
//     image: " data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFRUWFRcXFRUVFRYVGBUXFxYXFhcVFRUYHSggGBolHhUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lICUtLS0tLTAvLS01LS0tLSstLS0tLS0tLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALEBHAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQYAB//EADwQAAEDAgQEBAQFAgYCAwEAAAEAAhEDIQQSMUEFUWFxEyKBkQYyobFCwdHh8FJyFCNigpLxFTMWNKIH/8QAGgEAAwEBAQEAAAAAAAAAAAAAAgMEAQAFBv/EADARAAICAQQAAggGAwEAAAAAAAABAhEDBBIhMUHwEyIyUWFxgcEFM5Gh0eEUI7EV/9oADAMBAAIRAxEAPwD5I1GpBVa1GaVEz1YDmHZunKbVnUnp+i9SZIs9HDNDbLJ3D1UvQbmCZoMUc2enj5GnNQy1FDYR6VOQl7iiqQiGLz2J9+HQqlJMjMRJmVWalXhalWglKlJPixE5WZ1RLVAnqjEu8J8WST5EnILwm67Eq4jQXPRPiyPIhd4QymHs5x2F0F8ck5SJZQKhTCgKwR2KaKlioWI4CnKtM2ihYqFicNNULFtgOIm5iGWp11NCdTRWC0KEKCEZzFQtWgNAl5XLVBatAaKrytlXsq2jCquFAarALGcSCrAqAFYBCaarAiQvUmo4YpT1aKNamKFS4CXRsDcidZQzjaDxT9ajo+H0bJ6mwA90BpaGNhUq14Fl5M4ts+hxyUUGxFQNGabTFv50XuHcTbN7LKqVyRBM3n6QgB4Bst/x+KMnqOfgdvSc2oCWkGNf+kriKS53BY0sdIP79CumpYhtRsj16FTyjLG/gdxNcGZWBSWIsCSYHVaHEazKbS95ho+vQcyudy+IDXr+WkLspnfkXDcnkq8K3K/DzwRZpbXtXfnllTUL/ks3+s7/ANo37rMxfEmtlrPMf6tp/ND4lxN9Y5GtLWzAYPmd0P6LW4bwXIA50F/0b2/VXKKgrn+hBvlkdQ+r/gxqeFqP81RxAN45jtoEwKQFgFrYoNb8xA7lZj8Q3nKJScvAyUIQ7fICpTQHMTTqo6e6AXOOjfumpMRKSfQEMVg1Xyu/pUid2lFYuiGhWyqzCO3dXIRWc0CyqpajAKwprbM2ij2oTmLRdRSz2LlKwJREnMQ3MThaqOYjQpoTyqpamnMVSxMQlgMi9kRw1TkRUA2AyL2VMZFBYso5MDlVgxEDVYNQtBJmsxqu1E8NeyqKz2KBGnK9QBCM1ea1Y2FCHNmphKpcIVsRTKBw+lLxG5WxxHCZBdRyrcejGT2nPvQTZGruSznJ0UT5JF21CtbhuP8ADuT5SPN05FYjCgY7EGzQDpJj2H5rJ4FPg6OpeNbjQFc4zEgGfDZcN5AbnqbIHHsY+o7yNcKbZFMkENdAu9p0Nhb3S/BuLigH/wCXmJ0Mx6Gy1viLiLTRpBsHNBgbANiB/wAoXbXDLFKPHS+7Fbo5MMpOXrdv7L5GV8M1GCoQ4+YwGdZN/VanHcfVYIY2G6GoRvybP3WH8PYc+I2odGmZ6bn2JROPcTdXdlZ8gMD/AFHmU6WK8t9oRDOo4HG6fwEGsdUddxJPMyVp4fAho8wk9bf/AJF0bhOFy+Volx+Z2kdJ/n1W9h8CyPMB/Oqe1ZJGVcmPhqYNg0egsmamChbLvDpi8dGj9ECpVpm9x2hd6IL/ACKXRjmiFDqC1KYp3iZ5kZvsVR+DIvd07x+WyyWNoOGdPhmS+kg+GtGoxCFO6BMc0hZtFMMw6YpUk2KSDJkoZDHZmVadln1GLdxIA7rNrUd1uOYrLjM4sQnBNVQgEKqLI5oDlUZUVU8VvP8AndNRPIplUwjZVBajQpoDC9CJlXsq0EplVgxWDUQBC0EmbNUIJctCrRSGIpwvJjOz6KeOgYcpDrpclXaU2haY/g6xacw/CQfRdgyicVSNRogNHm15bR9lxFGoQZXW/CVCpiGvpMqQGtJyk6gm9t437hRZ7XKLcclXJztajqkXtW9xikab3UzcgkT227LHfumwlatC5xXQtlU06ck/X8vv9VIuus4V8OkNa97g2QTMiWujUz/SPNew9kcpV8xah4+BxP8A441KuQWAMPJMCTt7fmtFvBQ3PUqCabPKzk9+1tmC56wFs8Rr0MKRAI8xc0XDiIsb6z5Z6nuucxHFHVaniVZcAT4dPQNBvoN73OqpjbR582k2BqUajgXeYMiGjTN100XsFgyNpdoAPlHc81oMNSsSXgxtFmtA0HL1KvW4iyk2B6Rz3jmU1E8mFpU8jdJdy1nrCJSe4i5ygc4Eeyx6dWpUu6Ws/pHLmTuUI1qZ2zRoJ8o7ncrRdm+DQbfOCdzePfdJ1OLU3HLRa6o7QGA1o6rn62LzkNBt/S0W991v8AwJeRDctOQHPIJ9v6j0COKbMkw1DhoDR41aMxkNDg2T0nZMN4RRbcVAP7Xkkdy1adbheEpOJZSqPLrZqryxpiNWuBBI2ssus2npTp5XC8iWHrafN7JrSQq2UrHk8uH+pv63QGuvp67fsmRjWgQ5zZOufy36O091Sta4kD0cPRKnjUhuPLKIaiEeu6BA9Ty/dZoxEbg+/wBlV1cu1PooMuHnk9PBqbVJBHC6riBZQHFUr1ECi7KHJNCNRqWrOA+6desHGVJd3gq2HJ5+bghr8zpOgv6DnzKfY2Re3Jo2HVZ2GcJaDpmE/ktHP5vRORIwdUFhH9J16fsjwjtEhQaQ5I0AwBYpDUXKrBq2waBhisGIrWIgahbO2m/XYkMRTkLaZRzNlLVcP9F87HJR9ZsbOcqU0MOha9ehKy61GCroZFIky49pIKc4RxCpRfnpuhw9jsQRuCs6YXhUWygpKjITS7Ok47xNteKjQWm4ewmYdzadS0j7HosirUkJRj5KO21zpEmDsEpQUFSH3uQ3wek7MHlnkuSXabxc21C9xXjzyQAZgkvFyHAvDy31gCOTQszH8Rc8CHlrAIDATESQJ225c/XJqYrQD3un48bvcyHPnv1Y9GieIOeahcWHPl85ALqYBzFtOTDQZj0Qmki93SY8vbnsEgXX0b1J/lkzTrRoY7GR+yoUUuiJtvsdZiGT5omdySrvqMmQ3N/qOgjks2ADNiOpKZe7M2NOQH5lEKYtisY6ocoJDeWkqmJOVoYNTc9uSPDWCTry3/YLPfULnZitNSNHAUg2HG/pYW5bnRbvDsVLmF73NYNAAM1uU2kxrtc8lzja9oBi0d/5+a0KGKu2AJvfWJHWy5MKcUdHjOIPd5muc5okGXCwI/qAAzdFiYqmZkXB2m+nNDxFY5oLrZbQef7z7pStWcWgzIbp12W7hUlYSq8gFpje3cJTC4vLoSOYmEOpW57pOrrK1MxI6KjXLuvtKZZVC5ei4g2K28Hjxo/33/dDNbhkHtZpASkcQ85gOpT9R7QLEEayOSxcTX+U83OU8YcljzXE0BcLC4hhXMM7aSt/BAkackWqwAeaI3nRFGW1m5IqcbOPKZpYq4naxPMIFYDMY0kwqKggNyhW22KalYWFrbH0Wvh3SEaYNWFUhyiFIC2zNpOZSHKFYFA5BqJ1uDqiNVNdu4WJSr8tluYbFAtvqvm8kHF2fXYuTLrCEjUbdbFamCUjWoJ+GasXqYcGRXppNwhb1TDpZ+DCtWRHmywsyTVRqFVRVoXReFUQ+sxhIGZ0X66D109Vs2qZ2PcpJGZjMIQSWny3ty3hKjD/ACyYDryNundbnGuG1afljOwkwWzmbB0I3hYVOqbjNY7ap2Ke6Npk+oxqE6afn7FajYFnTexjURsVTxD68/1TTKwG0+s/dEpZTyBTbokcb6CYaXC4k82xfuFFfFhnlaL7mdP3VS0geUkA7AR7oLmu5AdbLE0ZQNxLv3QyIlXfUAtPtf6oD3o0C2kFoO9L6rQwrAHEOfG4iD90hgqYcbrar4fK3y3ETtI0usZsXaF67m93chp7IFZ+825cj1CNiKhzXEEa7eoQKwnXceqAKrAtbIP8sl3FSHxI5qmU8kxIWyQ5MB1p9lVmF5lFexoCxtGpPxPDFkWmyrXxOYjkNEs5ylgWmI0KOOI3j1d+SjH44ublzTOoiPqboNCpB0B6FXrVBF2gekIaVjXJ1QmVUlWKgtRiqKtW7gh5QsNrSTAXQ4duVoHRZJ0FCNhwxTlVQ5XzJcpj447ILVIXnOQi5BusNwoca+Ctfh5BCwy5NYXEZSvNyQ3I9/FOjrqeDBFhKzsbgXN82yNw/iwAutYU/EZmBXmbp4Z89Fz25InKZTpolqxglptaQYm8WFrwdPZbGPoBoJzXj5QDM9DERpvOqTwWBdVNus9I/wCwvRjlVX4EGTA06MSq3NckAC38hLYf5gRqCCLLrcFwEkFrmODY1EB225t7rU4Z8EOLvFOVtK0k6AxzAjUSteqgk+RT09JSbBcO4dUqMzBuY025zF3OnLOv4oJvzK4X4q4a1uIcabKlEOuW1WFpzHXLFoX3jCVmMA8Om57gIzNaBJtrzFoXI8V+H6eJbWNWlVz5g7xM+d0NzFwAeYZM7Wt6KfS6pQlubM1CeeO2uurPjzMETp7wf0R8Lw8E+d0Dm1uY/WF2vE8BSpZKTTlbbMTm8Qtm8RY3B+yyqLG0XF76LqlE1IZUfmDQL/NbW7T6L0lqnONr6Ej0ai+afvMHjHCjRIAeXSJggscO7ZNusrOdROUuLgDIAaZzGdwOS+wY91A0qZxWBp03mlFCrVqtptMgub4hBmBmNrnpYr5VjWtZnacpdMAscHNMG5zbjlCbp87yLnv6EeowqDddGYoIVl4q089oLhnRK2KWJMDp9RcC4WC10JkVbDVBJcjYNUOuaHHX/rl0UYkybafmgOzZbG79ugIv0TbacNv6kD9VjRsZGcGgHnz2HurOqnbL90c1wBAgd0s5/VacS550QnFezKAtSMbIA5ogcobTJBKqHLQU6H8M4OZkIIJPldHb+eqDVoPGskDfUK2BqF7spdDQJ9lbGY3N5Wzl66n9AgpphqSYoiNoPcJAsuk4JwdnhCq8jMflBOkHWEXG0ztB7Kd6qO7ai1aGWzdIxsDhMtzqfotGnT5qjaBkTA9UejTK2WQKGFdFm0lYYc8kxhnZdWyO905/jKXIj2P2KlnlmukWQw4/FmacIUN2HT1fFt0APdKmu7ktjKXidKGPwAlVCuAvZUFlNBKVQrZ4dxt9JpaLgggjusLPCkvQSgpdmrJtOmPE2VJLnlloc3LMxyix9YXZ/BeOwVOhVqGA2nlc9zmnOTo0AGQZuLfuvmGDqQCncZjC5goj5A7MY/E4CAT0En3KQ8SUqH5cjz49snXXXHng6Hjn/wDUiXH/AA2HYwaB9QB7oGhg2B91x3GPi3G4kg1a7ob8rQGsaP8Aa0AEovFMLmLAGtbN3ZQBoBGndK46jDQAI/RUY1jVUuxTxqPEVVfr+vf7k4H43xtI+Ws76H7hdZwj4kfiGE1cdSpEzmY5rGOM6+YtAM9Cvm9agUHIU+elxTXCok9Pli+efojsOP4zDEZfEe9zSYJNoM6EAjWD7rC/88+m4miXNERlzOLSIi8+6yiFGVMx6eEVT5E5c85u1wH4lxivXM1ar36GC4kSBAIGgss1wTbmoRaqY0lSRBkxtvlgYUQi5Uzh8E5wLoOUakAmETml2KWFydCGQp7A4B5g5TqIt802gA67roeH8GbMh4LYs4Zm9wbT7TqFXiodTPnAnQNiC0RENAs20Wjkhjk3HTw7DONBtMNvcmXGNBNgXfoluJYnzQ0kgfz2ROIYlroa2w7fdZj9bIxatEOKqvEL2UlaY7PSrtYSQBugpzBG8zEBc+DocuguJpBrQJvAsNu6zyUziKlylguidPuiWotJvtuhgI1OqQIHdYwoJeJqt4rUaAwEHkCAY9VLa1Rx+Yekf9rLY47I9OoRv9Sp3jS6SLo5JS7bNE1I1kn+2frKkYwdfaPzWea3T6lVFRD6MNzS6NihxAAixI3HPpqiVuLD8LMvrMeqx8xOiIymULxx7YayS6Q+MUXaozSk6QR0qQ+C45DZ1QlVzKRdBRRdkAJuiwFRTpJmlSS5zGwxeIF9E8lZjiNvValHDyLqRghKR6ZeI30VdGYcRa4SuNqiLanefyW1UwIKzqnCHveGsFz+I2aBu4nYBMxzhYnLGSRz1XEEaoHjcl0XEcVhcNDKTG16g+arUktnkxg27krGGLq1nZQJLjAbTY0SToAAF6EHauuDy8kpxltvn3FaWGLzDRmPIEHqUWnhDOWwJ2Nj9V1GD+CadHzcRrikYBbRoxUqkHd/4WD3XuJ0OHf+uiS2Bao57nVCf7TDfYJbzJ+y7KMe5JSlD7GDU4QWiX2/mk87JY8OmzbmCT0A1lNVuG1x5f8ANqE3AYx7geTpEhO8K+GcVUd5wabfxeIctjzbr7wsU2lbkbKSbrZ/Rl4RtFpc3L42Zoa10OBZUPJsiQIN+S3sBw9we0UXy1zJLml2SD85LdS1oI2uVpvwWFoSxpZUqBpsNBa5eZhre5S1bHZGv8IZswbnql5AqTBytYWj/LF9JaZ1Ky/SCZf6xbiApUg3I7xDHlJkSTezTEa6/kub4nxR73HNd0kknlNgOiNxTiBNyQ49oHfposOoZMqyHRBk5dk162a2kfUoYvYSphHoMB/FlJ52EeiY3SFxg5MCzDuOx7wU7RwB39pH1urirUbo8kdDI+qr/iHHVrXf7Y+rYKVKUn1RXDDih3dg8TgHBuYCRvF47oLqJYL79E5SqDk5vYyOxBv9Ud9e2UkEbhwLfvI9Qs3yXDNeDHL1k68/QxXqGtTZYwz9IMoACcpEcsTTtlQjso2TmGwJABIudB07dV0fCPhirVIcGWDw1xt5dySP5yU+XUxguWehg0E2rlwcvTw51UBi6XiXDfDqOp38pgyIPss7E0AEuOdSLpfh+2Noy/CleFGFqYfBOcJAsNTy6lHpcPMwRfkteZIW9G/BGXSpkFaeHpSnRgei8+jl78lPPMpdBw0zjywJoAJdzU65pj5SewlZuIJBgiOhWQtmypAW11dmIWUKpU+IVY8RGtQdFQxQTTcWOf8AOi5duIhEbi+SRLTWUx1iR2GHxo5rRwpzEXEdVwjMa4bo1PHO3J91NPRt9FMNbHxPoVKm2RJB7G32WH8VcS8OaTI8wGaDtrBK5scRIOp9ylsRiA50uOoWYdG4yuTtG5NbFxddib2SV9B+FG08NROKDRLRlp5miTVIBc4k7NkW006rhamJB200K6THYpwwtCmPwskj/VUJeT7Fo/2qrVKUoqPvZN+HwhPJKTV0rfn4mTxviLqjnOc4uJJJJJkk6k80jwvD1KtRrAR5jq6wAFy4nkACfRBrGfdbOGxBo03gAZnjLmOzdSB3MJtLHGkLlJ6jI5t8I2j8T1cPT8PDCWMEFzxJdzdB0JmYvCw+IfF+LrMyF4AiCWjKT3KxMRinG02S5q9VuPSxXLSsk1Ort1FujSqYmo9rR5fJpYZnX00vzQa/EqpGVz3W2J+/NJeJ1KoSqVBIglmb8Qz6xcb3VcytRpO1hwG5A+0pqngmHV7h3Bn7LXSBTkxKVYOWpR4Lm0J9Qb/RS/gL5gAk8lm5BLcI0q8aevXpKJUrtJs0j1nlvHf3RjweoATlsNd49kk9gG/pcfdDtXY1ZmlQdz3RYygubzUh0bqA0lYlQTmpDnD+DV6zXOpUnPDfmyiYnopwGEzOAO5H1MI+AdUZenUcw6eUlvsRvZNcOxBp1WVPxBwd5r+YGZM635pE8kuf2L9Nix742jueMfBTgGukUoHnYfOGGAZD7CL6E2G66/4Uo06TGMLqc5bkGSTeKhm0mY1iQY1txXE/j+pVZ535jls3K0gu0lwI0i0LkBxmsAWiq8A6gOIFtAIOgXl+gy5FUui3LmTjtk+fh/Z9C43gjUeXDIHhrpa4NuZJAgnlAkWt6pGjwdr6D25ROTNmlukk5QCJ3G64Z/FHnV59yh0uKVGTlqPbOoDiEyOkyJUmG9bjqjYbhxTc1jnAE3Ga4bPPKTOi18BxNg8jmsz6XIvHf9VxGM4k98ZiHZRAkCY7pJ2IJ1JJ5noqHpHNesxf/p7OF0d7isUyCcwj+bLBxXEZJi/VYn+IJESVem9Fj0ih2KzfiO7iKD1sS4oPilXJCrAVKj8Dz5ZW32Z4KmUHMpDlRRGsgXMvByo0Ep7B8Mc83OUc4n6IJNRVsZDdN1EXFRGwlGrVMU2Ocegn9gujwfCsOyCWF/8AqqOgf8V0OCqAjKywG7QA3tOhUWbV7V6sf1PUwaHe/XmvkufP7nIYX4TxTzcNb0c6T7NBTGI+FxSgVKkH/jryldy2hTAlz3TyBi3eyxeK4zDgwWtjnILh1v8AYqKOszZJV/xfyWS0ODEvf82c4zh7Jy6jmAXD3haPG8BUMloAYNXEjTQAJOrii1x8Igj+og/QOsFlYjGVneUvJHISfbkFXGE5yUr6JXqoYoThFe14r4EtwrQ5s1Gm8wDOl4PJJcRxXiOtOUWHLutDhHA/FfDqrafV0k+w/VdNW+EKVKn4ji9zR+JrMwPfLIZ6wqHkhCVt2yH/AGSxOCVJu39jhKeEJ0BP29U5h+BVH6NPrYR3Ovoul/8AkFOgIpZDOoDTI6F839lgY/ilas7M7MSPl8xsOQ3TI5Jy64JZ4ow4fPyJqcNoUn5ar3EjWGnKD33G0yh4rHsaIpNa3WCGCekl2Y/VL1KFRwlxgG2sn2JTmFwDARYOGXVxnfkmRi32xLlXSK4P4ke352Nfb8WYn7qf/OPqvgtYxp1LKcke5Wk+sxglmTNtDG6je4S9bimaJY7P+JzS0A9YIRg032VrNwwl1WrVcbQ1sMnoRFhrdKP41lJ8JpDT+Fzs4g7EFJVD5iXiT3/JXfiAB8o7WssCcR6l8RENyeDQ7+E0kqfArVW+Si++uRlj9Fm0cRlOZrSDzC6TBfF72tyucTbdgP2Wgrg5rFYZ1Mw5rmu3DhH3VqGNLbG45WXR4n4j8QHNBsREATPSIKwzlBJyNI1h1vaFjV9mptdG/wALYalMuptMdd+cc0lj8CZkTO4KRo8RcyfCL6XRpLmnTUH7rz+MVnfM4n6GyUsVOx7ztqgGIc5u4SxxBTb8YHfO2RN7RHqNeysMAxzZa8Afy0FNUUKeSQh46t4sohw7QfmBhUMBdSNU5e8i6tlKhrwvOrLqN3Fmq7SljWVS+V1Gbxx2IAVf8WORSkL2VbSB3SKo1FQvLn0DDs1qPyjutLC6tXl5TzLsRfHfOO4+66ehv/t+68vKPL7MT09P7WQRxXyu/tH3XJN2UryPD7JPrPbRTEant+aHgfmKheVC9giX5i+Zo0Nfb7hdH8Rf/UH9jfupXlNP24/Mof5b8+84KnsncJ8j/ReXlZMlQF2p7hGfoey8vJyJX2Uq6s7fkFUfP6Ly8uDQpifnPdA3Xl5cjpByqheXlwLLsRivLy0wrR+b0QRuvLy45Fh/63dwgU9D6Ly8sNfZC8pXlxyKqq8vLQZEhSF5eXHIkKV5eWBn/9k="
// });

//routes
app.get("/", function (req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function (req, res) {
    blog.find({}, function (err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", function (err, blogs) {
                blog.find({}, function (err, blogs) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render("index", {
                            blogs: blogs
                        });
                    }
                });
            });
        }
    });
});

//NEW

app.get("/blogs/new", function (req, res) {
    res.render("new");
});

//CREATE

app.post("/blogs", function (req, res) {
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            res.render("new");
        } else {
            //redirect
            res.redirect("/blogs");
        }
    });
});

//SHOW

app.get("/blogs/:id", function (req, res) {
    blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            redirect("/blogs");
        } else {
            res.render("show", {
                blog: foundBlog
            });
        }
    });
});

//EDIT

app.get("/blogs/:id/edit", function (req, res) {
    blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {
                blog: foundBlog
            });
        }
    });
});

//UPDATE

app.put("/blogs/:id", function (req, res) {
    req.body.blogs.body = req.sanitize(req.body.blogs.body);
    blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err) {
            redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DESTROY

app.delete("/blogs/:id", function (req, res) {
    blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});







app.listen(5000, function () {
    console.log("Server has started");
});
