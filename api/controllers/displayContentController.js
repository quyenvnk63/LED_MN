const displayContentService = require('../services/displayContentService');
const {uuidToInt} = require('../utils/uuidInt');


async function getUrlContent(req, res) {
  try {
    const { key } = req.params;

    // Gọi hàm getPresignedUrl để lấy URL từ key
    const { url } = await displayContentService.getUrlContent(key);

    res.status(200).json({ url });
  } catch (error) {
    console.error('Failed to get presigned URL:', error);
    res.status(500).json({ error: 'Failed to get presigned URL' });
  }
}

async function getPresignedUrl(req, res) {
  try {
    const { contentType } = req.query;
    const { key, url } = await displayContentService.getPresignedUrl(contentType);
    res.status(200).json({ key, url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllDisplayContents(req, res) {
  try {
    const displayContents = await displayContentService.getAllDisplayContents();
    res.json(displayContents);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getDisplayContentById(req, res) {
  const { id } = req.params;
  try {
    const displayContent = await displayContentService.getDisplayContentById(id);
    if (!displayContent) {
      return res.status(404).json({ error: 'DisplayContent not found' });
    }
    res.json(displayContent);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createDisplayContent(req, res) {
  const id = await uuidToInt();
  const Led_panel_id = req.params.ledpanelId;
  const {  type, name, path } = req.body;
  const data = { id, type, name, path };

  try {
    
    const displayContent = await displayContentService.createDisplayContent(data);
    await displayContentService.assignContentToDisplay(Led_panel_id, displayContent.id); 
    res.json(displayContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateDisplayContent(req, res) {
  const { id } = req.params;
  const { type, name, path } = req.body;
  const data = { type, name, path };
  try {
    const displayContent = await displayContentService.updateDisplayContent(id, data);
    res.json(displayContent);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteDisplayContent(req, res) {
  const { id } = req.params;
  // console.log(id);
  try {
    const deletedDisplayContent = await displayContentService.deleteDisplayContent(id);
    console.log('Fetched DisplayContent:', deletedDisplayContent);
    if (!deletedDisplayContent) {
      // If the display content with the given ID was not found
      console.log('deletedDisplayContent' +deletedDisplayContent );
      return res.status(404).json({ error: 'DisplayContent not found' });
    }
    res.json({ message: 'DisplayContent deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json( error.message);
  }
}


  async function setDisplayedContentForLedPanel(req, res) {
        const  displayContentId= req.params.displayContentId;
        const ledPanelId = req.body.ledPanelId;

        try {
          await displayContentService.setDisplayedContentForLedPanel(ledPanelId, displayContentId);
          console.log('Displayed content has been set successfully.');
          res.json({ message: 'Displayed content has been set successfully.' });
        } catch (error) {
          res.status(500).json({error: error.message});
        }
  }

  //overloading 

  async function setDisplayedContentForLedPanelOverloaded(ledPanelId, displayContentId) {
    try {
      await displayContentService.setDisplayedContentForLedPanel(ledPanelId, displayContentId);
      console.log('Displayed content has been set successfully.');
      // Không return res.json() trong hàm này, để xử lý kết quả trả về ở các controller sử dụng hàm này
      return { success: true };
    } catch (error) {
      // Không return res.json() trong hàm này, để xử lý kết quả trả về ở các controller sử dụng hàm này
      throw new Error(error.message);
    }
  }
  

  async function getContentbyLedPanel(req, res) {
    const ledPanelId = req.params.ledPanelId;
    try {
      const content = await displayContentService.getContentbyLedPanel(ledPanelId);
  
      // Extract the necessary data from the content
      const extractedData = content.map((item) => {
        return {
          is_displayed: item.dataValues.is_displayed,
          display_content: item.DisplayContent.dataValues,
        };
      });
  
      res.json(extractedData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  

module.exports = {
  getPresignedUrl,
  getAllDisplayContents,
  getDisplayContentById,
  createDisplayContent,
  updateDisplayContent,
  deleteDisplayContent,
  setDisplayedContentForLedPanel,
  getContentbyLedPanel,
  getUrlContent,
  setDisplayedContentForLedPanelOverloaded,

};
