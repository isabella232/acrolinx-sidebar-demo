/*
 *
 * * Copyright 2015 Acrolinx GmbH
 * *
 * * Licensed under the Apache License, Version 2.0 (the "License");
 * * you may not use this file except in compliance with the License.
 * * You may obtain a copy of the License at
 * *
 * * http://www.apache.org/licenses/LICENSE-2.0
 * *
 * * Unless required by applicable law or agreed to in writing, software
 * * distributed under the License is distributed on an "AS IS" BASIS,
 * * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * * See the License for the specific language governing permissions and
 * * limitations under the License.
 * *
 * * For more information visit: http://www.acrolinx.com
 *
 */


import {AbstractRichtextEditorAdapter} from "./AbstractRichtextEditorAdapter";
import {getElementFromAdapterConf, AdapterConf} from "./AdapterInterface";
import {scrollIntoView} from "../utils/scrolling";
import {DocumentSelection} from "../acrolinx-libs/plugin-interfaces";
import {getSelectionHtmlRange} from "../utils/range";


export class ContentEditableAdapter extends AbstractRichtextEditorAdapter {
  element: Element;

  constructor(conf: AdapterConf) {
    super(conf);
    this.element = getElementFromAdapterConf(conf);
  }

  getEditorElement(): Element {
    return this.element;
  }

  getContent() {
    return this.element.innerHTML;
  }

  protected getSelection(): DocumentSelection | undefined {
    const htmlRange = getSelectionHtmlRange(this.getEditorElement() as HTMLElement);
    if (htmlRange) {
      console.log('selected content: ', this.getContent().slice(htmlRange[0], htmlRange[1]));
      return {
        ranges: [htmlRange]
      };
    } else {
      return undefined;
    }
  }

  getEditorDocument(): Document {
    return this.element.ownerDocument;
  }

  protected scrollElementIntoView(el: HTMLElement) {
    scrollIntoView(el, this.config.scrollOffsetY);
  }

}

