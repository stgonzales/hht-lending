const electron = require('electron')
      const {ipcRenderer} = electron

      updateList()

      async function submitMoviment(m){
        let tempObj = {}
        tempObj.hht = document.getElementById('hht').value 
        tempObj.user = document.getElementById('user').value 
        tempObj.moviment = m

        if(tempObj.hht == '' || tempObj.user == ''){
          alert('Fields HHT and/or USER can\'t be blank!')
          resetForm()
          return;
        }
                
        const res = await ipcRenderer.sendSync('moviment:add', tempObj)
        
        updateList()
        resetForm()

      }

      function resetForm(){
        document.getElementById('hht').value = ''
        document.getElementById('user').value = ''
      }

      //NOT WORKING
      function validateInput() {
        let x = document.getElementById('hht').value
        let y = document.getElementById('user').value
        if(parseInt(x) !== /^[0-9]*$/gm || parseInt(y) !== /^[0-9]*$/gm){
          alert('Only use numbers!')
          resetForm()
          return
        }
      }

      function updateList(){
        const tableBody = document.querySelector('tbody')        
        const data = JSON.parse(ipcRenderer.sendSync('load'))

        if(tableBody.rows.length > 0){
          const newTableBody = document.createElement('tbody')

          for(obj of data){
            const tableRow = document.createElement('tr')
          
            for([key, value] of Object.entries(obj)){
        
              const tableData = document.createElement('td')
              
              tableData.innerText = value
              tableRow.appendChild(tableData)
            }        
            newTableBody.appendChild(tableRow)
          }
          tableBody.parentNode.replaceChild(newTableBody,tableBody)
        }
        else{

          for(obj of data){
            const tableRow = document.createElement('tr')
          
            for([key, value] of Object.entries(obj)){
        
              const tableData = document.createElement('td')
              
              tableData.innerText = value
              tableRow.appendChild(tableData)
            }        
            tableBody.appendChild(tableRow)
          }
        }

      } 