
// imports
import httpStatus from 'http-status-codes';
import { map, filter } from 'lodash';

// local imports
import { isEventPredicate } from '../lib/item-util';
import { columns } from '../model/consts';

// logging
import { createLogger } from 'bunyan';

const log = createLogger({ name: 'http-util' });

const DEFAULT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Cache-Control': 'private, must-revalidate, max-age=0, no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
};

export function toResponse(status, payload) {
  const body = payload || {};
  return {
    statusCode: status,
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body),
  };
};

export function parseEvent(event) {
  const records = event.Records ? event.Records : [];
  const events = map(records, record => {
    try {
      const newImage = record.dynamodb.NewImage,
        address = newImage[columns.address].S,
        event_id = newImage[columns.event_id].S,
        type = newImage[columns.type].S,
        timestamp = newImage[columns.timestamp].S,
        data = newImage[columns.data] ? newImage[columns.data].S : null;
      return {
        address,
        event_id,
        type,
        timestamp,
        data,
      };
    } catch (err) {
      log.error({
        record,
        err,
      }, 'Failed to prase record');
      return {};
    }
  });
  return filter(events, isEventPredicate);
};
