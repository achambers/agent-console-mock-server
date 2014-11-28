module.exports = function(app) {
  var express = require('express');
  var homeNetworkStabilityRouter = express.Router();

  homeNetworkStabilityRouter.post('/', function(req, res) {
    var identifier = req.body['sns_service_id'];

    var response = {
      '_links': {
        'diag:latest_home_network_stability_job': {
          'href': '/api/home-network-stability/' + identifier
        }
      }
    };

    res.status(201).send(response);
  });

  homeNetworkStabilityRouter.get('/:identifier', function(req, res) {
    var identifier = req.params.identifier;
    var responseStatus = 200;

    var response;

    switch(identifier) {
      case '2222':
        response = {
          status: 'completed',
          wireless: {
            rag: 'amber',
            information_text: 'Unable to determine WiFI  reliability.\n\n Traffic loss is less than 10%',
            next_best_steps:  '- Check WiFi interface is enabled.\n\n'
                            + '- Open a new browser window and delete the contents of the address bar.\n\n'
                            + '- Type in 192.168.0.1 and press Enter.\n\n'
                            + '- If prompted at this point, enter the username and password.\n\n'
                            + '  - Default Username: admin\n\n'
                            + '  - Default Password: sky\n\n'
                            + '- Select the Wireless tab.\n\n'
                            + '- Select Enable Wireless Access Point\n\n'
                            + '- Check WPA2-PSK under Security Options is enabled\n\n'
                            + '- Make a note of the Network Key\n\n'
                            + '- Click Apply at the bottom of the page.\n\n'
                            + '- Refresh the status of the In-home diagnostic results using the Action menu.  If the fault is still persistent continue to follow ask dAVe.  The Jedi can also offer support.'
          },
          wired: {
            rag: 'amber',
            information_text: 'Unable to determine wired interface reliability.\n\n Traffic loss is less than 10%',
            next_best_steps: '- Try another LAN port or check devices are powered up.\n\n'
                           + '- Refresh the status of the In-home diagnostic results using the Action menu.\n\n'
                           + '- If the fault is still persistent continue to follow ask dAVe.  The Jedi can also offer support.'
          }
        };
        break;

      case '3333':
        response = {
          status: 'completed',
          wireless: {
            rag: 'red',
            information_text: 'WIFi connectivity is unreliable.\n\n Traffic loss is greater than 10%',
            next_best_steps: '- Try to change channel or move the attached device closer to the CPE.\n\n'
                           + '- Open a new browser window and delete the contents of the address bar.\n\n'
                           + '- Type in 192.168.0.1 and press Enter.\n\n'
                           + '- If prompted at this point, enter the username and password.\n\n'
                           + '  - Default Username: admin\n\n'
                           + '  - Default Password: sky\n\n'
                           + '- Select the Wireless tab.\n\n'
                           + '- Ensure Channel is set to Auto, or try alternative channels.\n\n'
                           + '- Refresh the status of the In-home diagnostic results using the Action menu.\n\n'
                           + '- If the fault is still persistent continue to follow ask dAVe.  The Jedi can also offer support.'
          },
          wired: {
            rag: 'red',
            information_text: 'Wired interface is unreliable.\n\n Traffic loss is greater than 10%',
            next_best_steps: '- Check that the LAN Ethernet cables are plugged in properly on the router and PC ends;\n\n'
                           + '- Check the pins in the Ethernet ports are undamaged;\n\n'
                           + '- Ensure the Ethernet cable is undamaged;\n\n'
                           + '- Ask the customer whether they added the RJ45 connectors themselves or bought the cable (unmodified after buying);\n\n'
                           + '- Try reinstalling the LAN Ethernet software driver on the PC.\n\n'
                           + '- Refresh the status of the In-home diagnostic results using the Action menu.\n\n'
                           + '- If the fault is still persistent continue to follow ask dAVe.  The Jedi can also offer support.'
          }
        };
        break;

      case '7777':
        response = {
          status: 'progressing'
        };
        break;

      case '8888':
        response = {
          status: 'failed',
          errors: [
            {
              'information_text': 'Router is not compatible.',
              'next_best_steps': 'The in-home diagnostics tool is compatible with Sagem Phase 3, Sky Hub and Sky Hub 2.0.\n\n Please follow ask dAVe for troubleshooting support.'
            }
          ]
        };
        responseStatus = 502;
        break;

      case '9999':
        response = {};
        responseStatus = 500;
        break;

      default:
        response = {
          status: 'completed',
          wireless: {
            rag: 'green',
            information_text: 'No traffic loss detected.',
            next_best_steps: 'No action required.'
          },
          wired: {
            rag: 'green',
            information_text: 'No traffic loss detected.',
            next_best_steps: 'No action required.'
          }
        };
    }

    setTimeout(function() {res.status(responseStatus).send(response);}, 6000);
  });

  app.use('/api/home-network-stability', homeNetworkStabilityRouter);
};

