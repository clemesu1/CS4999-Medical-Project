App = {
    loading: false,
    contracts: {},

    load: async() => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async() => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
            console.log("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                    // Acccounts now exposed
                web3.eth.sendTransaction({ /* ... */ })
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
                // Acccounts always exposed
            web3.eth.sendTransaction({ /* ... */ })
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async() => {
        // Set the current blockchain account
        App.account = web3.eth.accounts[0]
    },

    loadContract: async() => {
        // Create a JavaScript version of the smart contract
        const patientRecord = await $.getJSON('PatientRecord.json')
        App.contracts.PatientRecord = TruffleContract(patientRecord)
        App.contracts.PatientRecord.setProvider(App.web3Provider)

        // Hydrate the smart contract with values from the blockchain
        App.patientRecord = await App.contracts.PatientRecord.deployed()
    },

    render: async() => {
        // Prevent double render
        if (App.loading) {
            return
        }

        // Update app loading state
        App.setLoading(true)

        // Render Account
        $('#account').html(App.account)

        // Render Records
        await App.renderRecords()

        // Update loading state
        App.setLoading(false)
    },

    renderRecords: async() => {
        // Load the total patient count from the blockchain
        const patientCount = await App.patientRecord.recordCount()
        const $patientTemplate = $('.patientTemplate')

        // Render out each patient with a new patient template
        for (var i = 1; i <= patientCount; i++) {
            // Fetch the patient data from the blockchain
            const patient = await App.patientRecord.records(i)
            const patientId = patient[0].toNumber()
            const patientContent = patient[1]
            const patientCompleted = patient[2]

            // Create the html for the patient
            const $newPatientTemplate = $patientTemplate.clone()
            $newPatientTemplate.find('.content').html(patientContent)
            $newPatientTemplate.find('input')
                .prop('name', patientId)
                .prop('checked', patientCompleted)
                .on('click', App.toggleCompleted)


            // Show the patient
            $newPatientTemplate.show()
        }
    },

    createRecord: async() => {
        App.setLoading(true)
        const content = $('#diagnosis').val()
        await App.patientRecord.createRecord(content)
        window.location.reload()
    },

    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
            loader.show()
            content.hide()
        } else {
            loader.hide()
            content.show()
        }
    }
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})