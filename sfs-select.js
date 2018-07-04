window.onload = function () {
    function removeAll() {
        var data = arguments[0];
        console.log('data',data)
        var eles = document.getElementsByClassName('sfs-select-default__active')
        for (var i=0;i<eles.length;i++){
            if(data !== eles[i])
            {
                eles[i].classList.add('sfs-select-default__normal')
                eles[i].classList.remove('sfs-select-default__active')
            }
        }
    }
    function SFSelect() {

        document.addEventListener('click',function (event) {
            event.stopPropagation()
            removeAll()
        })
        console.log('sfs select init ')
        var _this = this
        this.className = 'sfs-select'
        this.doms = document.getElementsByClassName(this.className)
        this.doms_length = this.doms.length
        this.SFCreateElement = function (name, cls, type) {
            var newNode = document.createElement(type);
            newNode.classList = name
            return newNode
        }

        console.log('this.doms_length', this.doms_length)

        for (var i = 0; i < this.doms_length; i++) {
            var options = []
            var nowElement = _this.doms[i]
            nowElement.style.display = 'none'
            var newElement = _this.SFCreateElement('sfs-select-default', 'sfs-select-default-box', 'button')
            newElement.classList.add('sfs-select-default__normal')
            // 默认栏选择框
            newElement.addEventListener("click",function (e) {
                e.stopPropagation()
                removeAll(this)

                var obj = this
                if(obj.classList.contains('sfs-select-default__active')){
                    obj.classList.add('sfs-select-default__normal')
                    obj.classList.remove('sfs-select-default__active')
                }else{
                    obj.classList.add('sfs-select-default__active')
                    obj.classList.remove('sfs-select-default__normal')
                }
            },false)
            // 遍历出来所有options以及构建初始化结构
            for (var idx = 0; idx < nowElement.options.length; idx++) {
                // 维护选项数组
                options.push({
                    value:nowElement.options[idx].value,
                    content:nowElement.options[idx].textContent
                })
                newElement.selected_value = options[0].value
                newElement.selected_content = options[0].content
                newElement.selected_index = 0
                if (idx === 0) {
                    // 添加默认文字
                    var innerObject = _this.SFCreateElement('sfs-select-default-text', 'sfs-select-default-text', 'div')
                    innerObject.innerHTML = options[idx].content
                    // 添加默认列表
                    newElement.appendChild(innerObject)
                }
            }

            var dropBox = _this.SFCreateElement('sfs-select-div','sfs-drop-box','div')
            var ul = _this.SFCreateElement('sfs-select-ul','sfs-select-ul','ul')
            var object_id = 'sfs-select-ul-id-'+i
            ul.setAttribute('id',object_id)
            ul.setAttribute('sfs-index',i)
            nowElement.id = 'sfs-hide-select-index-'+i
            newElement.id = 'sfs-select-index-'+i
            // 添加进去所有options到ul中
            for (var x = 0; x < options.length; x++) {
                var sub_li = _this.SFCreateElement('sfs-select-li_' + x,'sfs-select-li','li')
                var sub_a = _this.SFCreateElement('sfs-select-a','sfs-select-a','a')
                sub_a.innerHTML = options[x].content
                sub_a.setAttribute('data-value',options[x].value)
                sub_a.setAttribute('data-content',options[x].content)
                sub_a.setAttribute('data-index',x)
                sub_a.setAttribute('parent-node',object_id)
                sub_a.setAttribute('sfs-index',i)
                sub_li.setAttribute('data-value',options[x].value)
                sub_li.setAttribute('data-content',options[x].content)
                sub_li.setAttribute('data-index',x)
                sub_li.setAttribute('parent-id',object_id)
                if(x === newElement.selected_index)
                    sub_li.classList.add('selected')
                // 下拉框内选择事件
                sub_a.addEventListener("click",function (e) {
                    e.stopPropagation()
                    var a = document.getElementById('sfs-select-index-' + this.getAttribute('sfs-index'))
                    var b = document.getElementById('sfs-hide-select-index-' + this.getAttribute('sfs-index'))
                    a.classList.add('sfs-select-default__normal')
                    a.classList.remove('sfs-select-default__active')
                    b.options[this.getAttribute('data-index')].selected = true
                    var subText = a.getElementsByClassName('sfs-select-default-text')
                    subText[0].innerHTML = this.getAttribute('data-content')
                },false)
                sub_li.appendChild(sub_a)
                ul.appendChild(sub_li)
            }
            dropBox.appendChild(ul)
            newElement.appendChild(dropBox)
            _this.doms[i].parentNode.insertBefore(newElement,nowElement)
        }
    }


    window.sfs_select = new SFSelect()

}