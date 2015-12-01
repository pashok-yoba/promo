/**
 * Created by pshcherbakov on 31.08.15.
 */

function CoruselOz(container, elements, list) {
    var widthCounteiner;
    var widthElements;
    var quantityElementsOnStage;
    var marginElements ;
    var movePercent ;
    this.init = function() {
        container.setAttribute('data-move', '0');
        widthCounteiner = container.clientWidth;
        widthElements = elements[0].clientWidth;
        quantityElementsOnStage = Math.floor(widthCounteiner / widthElements);
        marginElements = (widthCounteiner - widthElements * quantityElementsOnStage) / (2 * quantityElementsOnStage);
        movePercent = Math.floor(elements.length / quantityElementsOnStage);
        list.style.marginLeft = '0';
        this.changeMarginElements();
        this.listwidth();
    }
    this.changeMarginElements = function() {
        widthCounteiner = container.clientWidth;
        console.log(widthElements);
        marginElements = (widthCounteiner - widthElements * quantityElementsOnStage) / (2 * quantityElementsOnStage);
        this.listwidth();
        for (var i = 0; i< elements.length; i ++) {
            elements[i].style.margin =  '0 ' + marginElements + 'px' ;
        }
    }
    this.createArrow = function(nameClass) {
        var element = document.createElement('div');
        element.setAttribute('class', nameClass);
        container.appendChild(element);
        return element
    }
    this.listwidth = function() {
        var widthList = elements.length * (widthElements + marginElements * 2) + 50;
        list.style.width = widthList + 'px';

    }
    this.rightMove = function() {
        var move = +container.getAttribute('data-move');
        if (Math.ceil(quantityElementsOnStage * (move +1)) == elements.length ) {
            move = 0;
        }
        else {
            if (move + 1 < movePercent) {
                move++
            }
            else {
                if (elements.length % quantityElementsOnStage == 0) {
                    move = 0;
                }
                else {
                    move += (elements.length % quantityElementsOnStage) / quantityElementsOnStage;
                }
            }
        }

        container.setAttribute('data-move', move);
        move *= -100;
        TweenMax.to(list, 0.5, {'margin-left': move + '%'});
    }
    this.leftMove = function() {
        var move = +container.getAttribute('data-move');
        if (move == 0 ) {
            move =  (elements.length - quantityElementsOnStage) / quantityElementsOnStage ;
        }
        else {
            if (move - 1 > 0) {
                move--
            }
            else {
                if (elements.length % quantityElementsOnStage == 0) {
                    move =  (elements.length - quantityElementsOnStage) / quantityElementsOnStage ;
                }
                else {
                    move = 0;
                }
            }
        }

        container.setAttribute('data-move', move);
        move *= -100;
        TweenMax.to(list, 0.5, {'margin-left': move + '%'});
    }
    this.resize = function() {

        if (( 1 < marginElements ) && ( marginElements * 2 * quantityElementsOnStage < widthElements )) {
            this.changeMarginElements();
        }
        else {
            this.init();
        }

    }
    this.init();
    this.createArrow('arrowLeft');
    this.createArrow('arrowRight').addEventListener('click', this.rightMove );
    this.createArrow('arrowLeft').addEventListener('click', this.leftMove );
}