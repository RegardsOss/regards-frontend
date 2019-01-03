#!/usr/bin/env node
const fs = require('fs')

/**
 * Generates a SIP holding 10 features using regards-input/chris/input/chris_sip_*.dat in TEMP.json
 * Adds the field descriptiveInformation.storage information to point on storage-A, storage-B and storage-C
 * (used for multi-storage delete tests)
*/
const storages = [
  'storage1', // storageAB
  'storage2', // storageBC
  'storage3', // storageC
  'storage4', // storageAll
]

const filesChecksum = [
  '91df590e4ce5c9f805188eee2a38f894',
  'cd51bdf7ebf89547bed4399946bf1c13',
  '123a2b681bef35c9baaee65c85647d04',
  'a5f579533ccf7c5b5e4784d063bec3b7',
  '997d3e59ae2f0626d6ab99c991bc3d81',
  'a59e34f02a58475ba43e7ebeef9e31e9',
  '3156b4c5223ef598a914ec511203c1d5',
  '2949d0e9e904b2ef8d633f4b50fab29d',
  '121bcf3610a08f85c7ee447852754b8b',
  '7fc6388aaf4a507c88309936881adac4',
]

const sipFeatures = new Array(10).fill(null).map((x, index) => {
  const fileIndex = index + 1 < 10 ? `0${index + 1}` : index + 1
  let selectedStorageIndex
  if (index < 3) {
    selectedStorageIndex = 0
  } else if (index < 6) {
    selectedStorageIndex = 1
  } else if (index < 9) {
    selectedStorageIndex = 2
  } else {
    selectedStorageIndex = 3
  }

  return {
    ipType: 'DATA',
    id: `genererated-2-${fileIndex}`,
    geometry: null,
    properties: {
      contentInformations: [
        {
          representationInformation: {
            syntax: {
              mimeType: 'text/plain',
              name: 'TEXT',
            },
          },
          dataObject: {
            regardsDataType: 'RAWDATA',
            urls: [
              `file:/regards-input/chris/input/chris_sip_${fileIndex}.dat`,
            ],
            filename: `sip_${fileIndex}.dat`,
            reference: false,
            algorithm: 'MD5',
            checksum: filesChecksum[index],
          },
        },
      ],
      pdi: {
        contextInformation: {
        },
        referenceInformation: {},
        provenanceInformation: {
          history: [],
        },
        fixityInformation: {},
        accessRightInformation: {},
      },
      descriptiveInformation: {
        storage: storages[selectedStorageIndex],
      },
    },
    type: 'Feature',
  }
})

const fullSip = {
  type: 'FeatureCollection',
  metadata: {
    processing: 'DefaultProcessingChain',
    session: 'session test (2)',
  },
  features: sipFeatures,
}

fs.writeFileSync('./TEMP_SIP.json', JSON.stringify(fullSip), 'UTF8')
