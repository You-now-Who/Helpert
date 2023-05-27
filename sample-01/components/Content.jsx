import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import contentData from '../utils/contentData';

const Content = () => (
  <div className="next-steps my-5 mx-24 bg-white p-5 rounded-lg shadow-md" data-testid="content">
    <h2 className="my-5 text-center text-3xl font-bold text-gray-800" data-testid="content-title">
      What can I do next?
    </h2>
    <Row className="flex flex-wrap justify-center gap-4" data-testid="content-items">
      {contentData.map((col, i) => (
        <Col key={i} md={5} className="mb-4">
          <h6 className="mb-3 text-lg font-bold text-gray-800">
            <a href={col.link} className="flex items-center">
              <FontAwesomeIcon icon="link" className="mr-2 text-blue-500" />
              {col.title}
            </a>
          </h6>
          <p className="text-gray-700">{col.description}</p>
        </Col>
      ))}
    </Row>
  </div>
);

export default Content;