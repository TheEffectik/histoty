document.addEventListener('DOMContentLoaded', () => {
    var isDragging = false;
    var scale = 1;
    var minScale = 1;
    var maxScale = 4;
    var zoomSpeed = 0.1;
    var transform = { x: 0, y: 0 };
    var startMousePosition = { x: 0, y: 0 };
    var mapImage = document.querySelector('.map-image');
    
    
    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
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
        }
    });
    document.addEventListener('dragstart', (event) => {
        if (event.button === 0) {
            isDragging = true;
            startMousePosition.x = event.clientX; // Запоминаем начальную позицию мыши
            startMousePosition.y = event.clientY;
        }
    });
    
    document.addEventListener('drag', (event) => {
        if (event.button === 0) {
            isDragging = false;
        }
    });
    
    
    mapImage.addEventListener('wheel', (event) => {
        event.preventDefault();
        var delta = event.deltaY > 0 ? -zoomSpeed : zoomSpeed;
        var newScale = Math.max(minScale, Math.min(scale + delta, maxScale));

        if (newScale !== scale) {
            scale = newScale;
            updateTransform();
        }
    });

    function updateTransform() {
        mapImage.style.transform = `translate(${transform.x}px, ${transform.y}px) scale(${scale})`;
    }
});


// document.addEventListener('DOMContentLoaded', () => {
   
// });


// $(document).ready(function() {
//     var scale = 1;
//     var zoomSpeed = 0.1;
//     var isDragging = false;
//     var previousMousePosition = { x: 0, y: 0 };
//     var transform = { x: 0, y: 0 };

//     $('.map-image').on('wheel', function(event) {
//         event.preventDefault();
        
//         var offsetX = event.offsetX;
//         var offsetY = event.offsetY;
//         var imageWidth = $(this).width();
//         var imageHeight = $(this).height();

//         // Расчет процентов положения курсора относительно контейнера
//         var originX = (offsetX / imageWidth) * 100;
//         var originY = (offsetY / imageHeight) * 100;

//         // Изменение масштаба
//         scale += event.originalEvent.deltaY * -zoomSpeed;
//         scale = Math.min(Math.max(1, scale), 4); // Ограничение масштаба между 1 и 4

//         // Применение масштаба и изменение центра трансформации
//         $(this).find('.map-image').css({
//             'transform-origin': `${originX}% ${originY}%`,
//             'transform': 'scale(' + scale + ')'
//         });
//     });


//     // $('.map-image').on('mousedown', function(e) {
//     //     if (e.button === 0) { // Проверка на левую кнопку мыши
//     //         isDragging = true;
//     //         previousMousePosition.x = e.clientX;
//     //         previousMousePosition.y = e.clientY;
//     //         $('.map-image').css('cursor', 'grabbing');
//     //     }
//     // });

//     // $(document).on('mousemove', function(e) {
//     //     if (isDragging) {
//     //         var dx = e.clientX - previousMousePosition.x;
//     //         var dy = e.clientY - previousMousePosition.y;
//     //         transform.x += dx;
//     //         transform.y += dy;
//     //         updateTransform();

//     //         previousMousePosition.x = e.clientX;
//     //         previousMousePosition.y = e.clientY;
//     //     }
//     // });

//     // $(document).on('mouseup', function(e) {
//     //     if (e.button === 0) {
//     //         isDragging = false;
//     //         $('.map-image').css('cursor', 'grab');
//     //     }
//     // });

//     function updateTransform() {
//         $('.map-image').css('transform', `translate(${transform.x}px, ${transform.y}px) scale(${scale})`);
//     }
// });
