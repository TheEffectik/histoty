document.addEventListener('DOMContentLoaded', () => {
    var scale = 1;
    var minScale = 1;
    var maxScale = 10;
    var zoomSpeed = 0.1;
    var transform = { x: 0, y: 0 };
    var startMousePosition = { x: 0, y: 0 };
    var mapImage = document.querySelector('.map-image');
    
    
    document.addEventListener('dragover', (event) => {
        event.preventDefault();
        // mapImage.style.cursor = 'grabbing';
        // document.body.style.cursor = 'none';
        // Рассчитываем смещение относительно начальной позиции мыши
        let dx = event.clientX - startMousePosition.x;
        let dy = event.clientY - startMousePosition.y;

        // Обновляем координаты transform
        transform.x += dx;
        transform.y += dy;

        updateTransform(); // Применяем новые координаты

        // Обновляем начальную позицию мыши для следующего перемещения
        startMousePosition.x = event.clientX;
        startMousePosition.y = event.clientY;           
    });

    mapImage.addEventListener('mousedown', (event) => {
        console.log(event.clientX, event.clientY);        
    });

    document.addEventListener('dragstart', (event) => {
        startMousePosition.x = event.clientX; // Запоминаем начальную позицию мыши
        startMousePosition.y = event.clientY;
        // mapImage.style.cursor = 'grabbing';
    });
    
    document.addEventListener('dragleave', (event) => {
        startMousePosition.x = event.clientX; // Запоминаем начальную позицию мыши
        startMousePosition.y = event.clientY;
        // mapImage.style.cursor = 'default';      
    });

    function scaleAt(at, amount) {
        scale *= amount;
        pos.x = at.x - (at.x - pos.x) * amount;
        pos.y = at.y - (at.y - pos.y) * amount;
    }

    mapImage.addEventListener('wheel', (event) => {
        event.preventDefault();
    
        // Рассчет нового масштаба
        var delta = event.deltaY > 0 ? -zoomSpeed : zoomSpeed;
        var newScale = Math.max(minScale, Math.min(scale + delta, maxScale));
    
        if (newScale !== scale) {
            // Рассчет смещения
            transform.x *= (newScale / scale)
            transform.y *= (newScale / scale)
            
            scale = newScale;
    
            updateTransform();
        }
    });

    function updateTransform() {
        mapImage.style.transform = `translate(${transform.x}px, ${transform.y}px) scale(${scale})`;
    }
});