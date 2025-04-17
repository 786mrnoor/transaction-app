function reduceImage(file) {
    return new Promise((resolve) => {
        let img = document.createElement('img');
        let u = URL.createObjectURL(file);
        img.src = u;
        img.addEventListener('load', () => {
            let w = img.naturalWidth;
            let h = img.naturalHeight;
            if (w >= 4000 || h >= 4000) {
                w *= 0.2;
                h *= 0.2;
            }
            else if (w >= 3000 || h >= 3000) {
                w *= 0.3;
                h *= 0.3;
            }
            else if (w >= 2000 || h >= 2000) {
                w *= 0.6;
                h *= 0.6;
            }
            else if (w >= 1000 || h >= 1000) {
                w *= 0.8;
                h *= 0.8;
            }

            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(img, 0, 0, w, h);

            let newUrl = canvas.toDataURL('image/jpeg', 0.5);
            URL.revokeObjectURL(u);
            resolve(newUrl);
        })
    })
}

export default reduceImage