// Generated by dts-bundle v0.6.1
// Dependencies for this module:
//   ../../../diff-match-patch
//   ../../../codemirror

declare module 'acrolinx-sidebar-integration' {
    import { AcrolinxPlugin, autoBindFloatingSidebar } from "acrolinx-sidebar-integration/acrolinx-plugin";
    import { InputAdapter } from "acrolinx-sidebar-integration/adapters/InputAdapter";
    import { ContentEditableAdapter } from "acrolinx-sidebar-integration/adapters/ContentEditableAdapter";
    import { AbstractRichtextEditorAdapter } from "acrolinx-sidebar-integration/adapters/AbstractRichtextEditorAdapter";
    import { CKEditorAdapter } from "acrolinx-sidebar-integration/adapters/CKEditorAdapter";
    import { TinyMCEAdapter } from "acrolinx-sidebar-integration/adapters/TinyMCEAdapter";
    import { TinyMCEWordpressAdapter } from "acrolinx-sidebar-integration/adapters/TinyMCEWordpressAdapter";
    import { AutoBindAdapter } from "acrolinx-sidebar-integration/adapters/AutoBindAdapter";
    import { MultiEditorAdapter } from "acrolinx-sidebar-integration/adapters/MultiEditorAdapter";
    import { createPluginMessageAdapter } from "acrolinx-sidebar-integration/message-adapter/message-adapter";
    import { loadSidebarCode } from "acrolinx-sidebar-integration/utils/sidebar-loader";
    import { getSelectionHtmlRanges } from "acrolinx-sidebar-integration/utils/range";
    import { lookupMatches } from "acrolinx-sidebar-integration/lookup/diff-based";
    import { extractTextDomMapping } from "acrolinx-sidebar-integration/utils/text-dom-mapping";
    import { CodeMirrorAdapter } from "acrolinx-sidebar-integration/adapters/CodeMirrorAdapter";
    export interface AcrolinxSidebarIntegration {
        AcrolinxPlugin: typeof AcrolinxPlugin;
        autoBindFloatingSidebar: typeof autoBindFloatingSidebar;
        createPluginMessageAdapter: typeof createPluginMessageAdapter;
        loadSidebarCode: typeof loadSidebarCode;
        getSelectionHtmlRanges: typeof getSelectionHtmlRanges;
        adapter: {
            AbstractRichtextEditorAdapter: typeof AbstractRichtextEditorAdapter;
            AutoBindAdapter: typeof AutoBindAdapter;
            CKEditorAdapter: typeof CKEditorAdapter;
            CodeMirrorAdapter: typeof CodeMirrorAdapter;
            ContentEditableAdapter: typeof ContentEditableAdapter;
            InputAdapter: typeof InputAdapter;
            MultiEditorAdapter: typeof MultiEditorAdapter;
            TinyMCEAdapter: typeof TinyMCEAdapter;
            TinyMCEWordpressAdapter: typeof TinyMCEWordpressAdapter;
        };
        lookup: {
            lookupMatches: typeof lookupMatches;
        };
        extractTextDomMapping: typeof extractTextDomMapping;
    }
    global  {
        const acrolinx: {
            plugins: AcrolinxSidebarIntegration;
        };
    }
}

declare module 'acrolinx-sidebar-integration/acrolinx-plugin' {
    import { SidebarConfiguration } from "acrolinx-sidebar-integration/acrolinx-libs/plugin-interfaces";
    import { FloatingSidebar } from "acrolinx-sidebar-integration/floating-sidebar/floating-sidebar";
    import { AdapterInterface } from "acrolinx-sidebar-integration/adapters/AdapterInterface";
    import { AsyncStorage } from "acrolinx-sidebar-integration/floating-sidebar/async-storage";
    import { MultiEditorAdapterConfig } from "acrolinx-sidebar-integration/adapters/MultiEditorAdapter";
    export interface AcrolinxSimpleStorage {
        getItem(key: string): string | null;
        removeItem(key: string): void;
        setItem(key: string, data: string): void;
        clear(): void;
    }
    export interface AcrolinxPluginConfig {
        sidebarContainerId: string;
        sidebarUrl?: string;
        sidebarHtml?: string;
        checkSelection?: boolean;
        useMessageAdapter?: boolean;
        useSidebarFromSameOriginDirectly?: boolean;
        onSidebarWindowLoaded?: (sidebarWindow: Window) => void;
        getDocumentReference?: () => string;
        acrolinxStorage?: AcrolinxSimpleStorage;
    }
    export class AcrolinxPlugin {
        constructor(conf: AcrolinxPluginConfig);
        registerAdapter(adapter: AdapterInterface): void;
        configure(conf: SidebarConfiguration): void;
        init(): void;
        dispose(callback: () => void): void;
    }
    export interface AutoBindFloatingSidebarConfig extends AcrolinxPluginConfig, MultiEditorAdapterConfig {
        asyncStorage?: AsyncStorage;
    }
    export function autoBindFloatingSidebar(basicConf: AutoBindFloatingSidebarConfig): FloatingSidebar;
}

declare module 'acrolinx-sidebar-integration/adapters/InputAdapter' {
    import { Check, CheckResult, Match, MatchWithReplacement } from "acrolinx-sidebar-integration/acrolinx-libs/plugin-interfaces";
    import { AdapterConf, AdapterInterface, AutobindWrapperAttributes, ContentExtractionResult, ExtractContentForCheckOpts } from "acrolinx-sidebar-integration/adapters/AdapterInterface";
    import { AlignedMatch } from "acrolinx-sidebar-integration/utils/alignment";
    export type ValidInputElement = HTMLInputElement | HTMLTextAreaElement;
    export type Format = 'TEXT' | 'MARKDOWN';
    export type InputAdapterConf = AdapterConf & {
        format?: Format;
    };
    export class InputAdapter implements AdapterInterface {
        readonly element: ValidInputElement;
        config: InputAdapterConf;
        constructor(conf: InputAdapterConf);
        getContent(): string;
        getCurrentText(): string;
        getFormat(): Format;
        extractContentForCheck(opts: ExtractContentForCheckOpts): ContentExtractionResult;
        registerCheckResult(_checkResult: CheckResult): void;
        registerCheckCall(_checkInfo: Check): void;
        scrollAndSelect(matches: AlignedMatch<Match>[]): void;
        selectRanges(checkId: string, matches: Match[]): void;
        selectMatches<T extends Match>(_checkId: string, matches: T[]): AlignedMatch<T>[];
        replaceAlignedMatches(matches: AlignedMatch<MatchWithReplacement>[]): void;
        replaceRanges(checkId: string, matchesWithReplacement: MatchWithReplacement[]): void;
        getAutobindWrapperAttributes(): AutobindWrapperAttributes;
    }
}

declare module 'acrolinx-sidebar-integration/adapters/ContentEditableAdapter' {
    import { AbstractRichtextEditorAdapter } from "acrolinx-sidebar-integration/adapters/AbstractRichtextEditorAdapter";
    import { AdapterConf } from "acrolinx-sidebar-integration/adapters/AdapterInterface";
    import { DocumentSelection } from "acrolinx-sidebar-integration/acrolinx-libs/plugin-interfaces";
    export class ContentEditableAdapter extends AbstractRichtextEditorAdapter {
        element: Element;
        constructor(conf: AdapterConf);
        getEditorElement(): Element;
        getContent(): string;
        protected getSelection(): DocumentSelection | undefined;
        getEditorDocument(): Document;
        protected scrollElementIntoView(el: HTMLElement): void;
    }
}

declare module 'acrolinx-sidebar-integration/adapters/AbstractRichtextEditorAdapter' {
    import { Match, MatchWithReplacement, CheckResult, Check, DocumentSelection } from "acrolinx-sidebar-integration/acrolinx-libs/plugin-interfaces";
    import { AdapterInterface, AdapterConf, ContentExtractionResult, AutobindWrapperAttributes, ExtractContentForCheckOpts } from "acrolinx-sidebar-integration/adapters/AdapterInterface";
    export abstract class AbstractRichtextEditorAdapter implements AdapterInterface {
        html: string;
        config: AdapterConf;
        currentHtmlChecking: string;
        isCheckingNow: boolean;
        prevCheckedHtml: string;
        constructor(conf: AdapterConf);
        abstract getEditorDocument(): Document;
        abstract getContent(): string;
        protected getEditorElement(): Element;
        registerCheckCall(_checkInfo: Check): void;
        registerCheckResult(_checkResult: CheckResult): void;
        extractContentForCheck(opts: ExtractContentForCheckOpts): ContentExtractionResult;
        protected getSelection(): DocumentSelection | undefined;
        scrollToCurrentSelection(): void;
        protected scrollElementIntoView(el: HTMLElement): void;
        selectRanges(checkId: string, matches: Match[]): void;
        replaceRanges(checkId: string, matchesWithReplacement: MatchWithReplacement[]): void;
        getAutobindWrapperAttributes(): AutobindWrapperAttributes;
    }
}

declare module 'acrolinx-sidebar-integration/adapters/CKEditorAdapter' {
    import { Match, MatchWithReplacement } from "acrolinx-sidebar-integration/acrolinx-libs/plugin-interfaces";
    import { AbstractRichtextEditorAdapter } from "acrolinx-sidebar-integration/adapters/AbstractRichtextEditorAdapter";
    import { HasEditorID, ContentExtractionResult } from "acrolinx-sidebar-integration/adapters/AdapterInterface";
    export class CKEditorAdapter extends AbstractRichtextEditorAdapter {
        editorId: string;
        constructor(conf: HasEditorID);
        getEditor(): CKEDITOR.editor;
        getEditorDocument(): Document;
        getContent(): string;
        extractContentForCheck(): ContentExtractionResult;
        selectRanges(checkId: string, matches: Match[]): void;
        replaceRanges(checkId: string, matchesWithReplacementArg: MatchWithReplacement[]): void;
        isInWysiwygMode(): boolean;
    }
}

declare module 'acrolinx-sidebar-integration/adapters/TinyMCEAdapter' {
    import { AbstractRichtextEditorAdapter } from "acrolinx-sidebar-integration/adapters/AbstractRichtextEditorAdapter";
    import { HasEditorID } from "acrolinx-sidebar-integration/adapters/AdapterInterface";
    export class TinyMCEAdapter extends AbstractRichtextEditorAdapter {
        editorId: string;
        constructor(conf: HasEditorID);
        getEditor(): TinyMceEditor;
        getContent(): string;
        getEditorDocument(): Document;
        scrollToCurrentSelection(): void;
    }
}

declare module 'acrolinx-sidebar-integration/adapters/TinyMCEWordpressAdapter' {
    import { TinyMCEAdapter } from "acrolinx-sidebar-integration/adapters/TinyMCEAdapter";
    export class TinyMCEWordpressAdapter extends TinyMCEAdapter {
        getEditor(): TinyMceEditor;
        getContent(): string;
        getEditorDocument(): Document;
        scrollToCurrentSelection(): void;
        scrollToCurrentSelectionWithGlobalScrollbar(): void;
        protected scrollIntoViewWithGlobalScrollbar(sel: Selection): void;
    }
}

declare module 'acrolinx-sidebar-integration/adapters/AutoBindAdapter' {
    import { Check, CheckResult, Match, MatchWithReplacement } from "acrolinx-sidebar-integration/acrolinx-libs/plugin-interfaces";
    import { AdapterInterface, CommonAdapterConf, ContentExtractionResult, ExtractContentForCheckOpts } from "acrolinx-sidebar-integration/adapters/AdapterInterface";
    import { MultiEditorAdapterConfig } from "acrolinx-sidebar-integration/adapters/MultiEditorAdapter";
    export class AutoBindAdapter implements AdapterInterface {
        constructor(conf: (MultiEditorAdapterConfig & CommonAdapterConf));
        getFormat(): "AUTO" | "HTML";
        extractContentForCheck(opts: ExtractContentForCheckOpts): Promise<ContentExtractionResult>;
        registerCheckCall(_checkInfo: Check): void;
        registerCheckResult(_checkResult: CheckResult): void;
        selectRanges(checkId: string, matches: Match[]): void;
        replaceRanges(checkId: string, matchesWithReplacement: MatchWithReplacement[]): void;
    }
}

declare module 'acrolinx-sidebar-integration/adapters/MultiEditorAdapter' {
    import { Check, CheckResult, Match, MatchWithReplacement } from "acrolinx-sidebar-integration/acrolinx-libs/plugin-interfaces";
    import { AdapterInterface, ContentExtractionResult, ExtractContentForCheckOpts } from "acrolinx-sidebar-integration/adapters/AdapterInterface";
    import { EscapeHtmlCharactersResult } from "acrolinx-sidebar-integration/utils/escaping";
    export interface RemappedMatches<T extends Match> {
        matches: T[];
        adapter: AdapterInterface;
    }
    export type AttributeMap = {
        [key: string]: any;
    };
    export interface WrapperConfOptions {
        tagName?: string;
        attributes?: AttributeMap;
    }
    export type AddSingleAdapterOptions = WrapperConfOptions;
    export interface WrapperConf extends WrapperConfOptions {
        tagName: string;
        attributes: AttributeMap;
    }
    export interface RegisteredAdapter {
        id: string;
        adapter: AdapterInterface;
        wrapper: WrapperConf;
        checkedRange?: [number, number];
        escapeResult?: EscapeHtmlCharactersResult;
    }
    export interface CheckedRegisteredAdapter extends RegisteredAdapter {
        checkedRange: [number, number];
    }
    export interface MultiEditorAdapterConfig {
        aggregateFormat?: 'AUTO' | 'HTML';
        documentHeader?: string;
        rootElement?: WrapperConfOptions;
        beforeCheck?: (multiAdapter: MultiEditorAdapter) => void;
    }
    export class MultiEditorAdapter implements AdapterInterface {
        constructor(config?: MultiEditorAdapterConfig);
        getFormat(): "AUTO" | "HTML";
        addSingleAdapter(singleAdapter: AdapterInterface, opts?: AddSingleAdapterOptions, id?: string): void;
        removeAllAdapters(): void;
        extractContentForCheck(opts: ExtractContentForCheckOpts): Promise<ContentExtractionResult>;
        registerCheckCall(_checkInfo: Check): void;
        registerCheckResult(checkResult: CheckResult): void;
        selectRanges(checkId: string, matches: Match[]): void;
        remapMatches<T extends Match>(matches: T[]): {
            [id: string]: RemappedMatches<T>;
        };
        getAdapterForMatch(match: Match): CheckedRegisteredAdapter;
        replaceRanges(checkId: string, matchesWithReplacement: MatchWithReplacement[]): void;
    }
}

declare module 'acrolinx-sidebar-integration/message-adapter/message-adapter' {
    import { AcrolinxPlugin } from "acrolinx-sidebar-integration/acrolinx-libs/plugin-interfaces";
    export function connectAcrolinxPluginToMessages(acrolinxPlugin: AcrolinxPlugin, sidebarWindowIframe: HTMLIFrameElement): void;
    export function createPluginMessageAdapter(): AcrolinxPlugin;
}

declare module 'acrolinx-sidebar-integration/utils/sidebar-loader' {
    import { AcrolinxPluginConfig } from "acrolinx-sidebar-integration/acrolinx-plugin";
    export const SIDEBAR_URL = "https://sidebar-classic.acrolinx-cloud.com/v14/prod/";
    export class SidebarURLInvalidError extends Error {
        message: string;
        configuredSidebarURL: string;
        htmlLoaded: string;
        details: string;
        constructor(message: string, configuredSidebarURL: string, htmlLoaded: string);
    }
    export function loadSidebarCode(sidebarUrl?: string): void;
    export function loadSidebarIntoIFrame(config: AcrolinxPluginConfig, sidebarIFrameElement: HTMLIFrameElement, onSidebarLoaded: () => void): void;
}

declare module 'acrolinx-sidebar-integration/utils/range' {
    export function getSelectionHtmlRanges(editorElement: HTMLElement): [number, number][];
}

declare module 'acrolinx-sidebar-integration/lookup/diff-based' {
    import { Match } from "acrolinx-sidebar-integration/acrolinx-libs/plugin-interfaces";
    import { OffSetAlign, AlignedMatch } from "acrolinx-sidebar-integration/utils/alignment";
    import { Diff } from "diff-match-patch";
    export type InputFormat = 'HTML' | 'TEXT';
    export function createOffsetMappingArray(diffs: Diff[]): OffSetAlign[];
    export function lookupMatches<T extends Match>(checkedDocument: string, currentDocument: string, matches: T[], inputFormat?: InputFormat): AlignedMatch<T>[];
}

declare module 'acrolinx-sidebar-integration/utils/text-dom-mapping' {
    export interface TextDomMapping {
        text: string;
        domPositions: DomPosition[];
    }
    export interface DomPosition {
        node: Node;
        offset: number;
    }
    export function textMapping(text: string, domPositions: DomPosition[]): TextDomMapping;
    export function concatTextMappings(textMappings: TextDomMapping[]): TextDomMapping;
    export function domPosition(node: Node, offset: number): DomPosition;
    export function extractTextDomMapping(node: Node): TextDomMapping;
    export function getEndDomPos(endIndex: number, domPositions: DomPosition[]): DomPosition;
}

declare module 'acrolinx-sidebar-integration/adapters/CodeMirrorAdapter' {
    import { Check, CheckResult, Match, MatchWithReplacement } from "acrolinx-sidebar-integration/acrolinx-libs/plugin-interfaces";
    import { AdapterInterface, ContentExtractionResult, ExtractContentForCheckOpts } from "acrolinx-sidebar-integration/adapters/AdapterInterface";
    import { EditorFromTextArea } from "codemirror";
    export type CodeMirrorAdapterConf = {
        editor: CodeMirror.Editor | EditorFromTextArea;
        format?: string;
    };
    export class CodeMirrorAdapter implements AdapterInterface {
        constructor(conf: CodeMirrorAdapterConf);
        getContent(): string;
        getFormat(): string;
        extractContentForCheck(opts: ExtractContentForCheckOpts): ContentExtractionResult;
        registerCheckResult(_checkResult: CheckResult): void;
        registerCheckCall(_checkInfo: Check): void;
        selectRanges(_checkId: string, matches: Match[]): void;
        replaceRanges(_checkId: string, matchesWithReplacement: MatchWithReplacement[]): void;
    }
}

declare module 'acrolinx-sidebar-integration/acrolinx-libs/plugin-interfaces' {
    export interface SidebarConfiguration {
        readOnlySuggestions?: boolean;
    }
    export interface InitParameters extends SidebarConfiguration {
        clientComponents?: SoftwareComponent[];
        clientLocale?: string;
        clientSignature?: string;
        serverAddress?: string;
        showServerSelector?: boolean;
        checkSettings?: CheckSettings;
        defaultCheckSettings?: CheckSettings;
        enableSingleSignOn?: boolean;
        enforceHTTPS?: boolean;
        supported?: {
            checkSelection?: boolean;
        };
        uiMode?: UiMode;
        helpUrl?: string;
    }
    export type UiMode = 'default' | 'noOptions';
    export type CheckSettings = CheckSettingsSelection | CheckingProfileSelection;
    export interface CheckSettingsSelection {
        language: string;
        ruleSetName: string;
        termSets: string[];
        checkSpelling: boolean;
        checkGrammar: boolean;
        checkStyle: boolean;
        checkReuse: boolean;
        harvestTerms: boolean;
        checkSeo: boolean;
        termStatuses: string[];
    }
    export interface CheckingProfileSelection {
        profileId: string;
    }
    export interface SoftwareComponent {
        id: string;
        name: string;
        version: string;
        category?: string;
    }
    export const SoftwareComponentCategory: {
        MAIN: string;
        DEFAULT: string;
        DETAIL: string;
    };
    export interface RequestGlobalCheckOptions {
        selection: boolean;
    }
    export interface CheckOptions {
        inputFormat?: string;
        base64EncodedGzipped?: boolean;
        requestDescription?: {
            documentReference?: string;
        };
        selection?: DocumentSelection;
    }
    export interface DocumentSelection {
        ranges: DocumentRange[];
    }
    export type DocumentRange = [number, number];
    export interface Check {
        checkId: string;
    }
    export interface CheckResult {
        checkedPart: CheckedDocumentPart;
        error?: CheckError;
    }
    export interface CheckedDocumentPart {
        checkId: string;
        range: [number, number];
    }
    export type InvalidDocumentPart = CheckedDocumentPart;
    export type CheckedDocumentRange = CheckedDocumentPart;
    export interface Match {
        content: string;
        range: [number, number];
        extractedRange?: [number, number];
        locations?: MatchLocation[];
    }
    export interface MatchLocation {
        type: string;
        title?: string;
        values: {
            [key: string]: string;
        };
    }
    export interface MatchWithReplacement extends Match {
        replacement: string;
    }
    export interface DownloadInfo {
        url: string;
        filename: string;
    }
    export interface OpenWindowParameters {
        url: string;
    }
    export interface InitResult {
        error?: SidebarError;
    }
    export interface SidebarError {
        code: string;
        message: string;
    }
    export interface CheckError extends SidebarError {
        checkId: string;
    }
    export interface AcrolinxPluginConfiguration {
        supported: {
            base64EncodedGzippedDocumentContent: boolean;
        };
    }
    export interface AcrolinxSidebar {
        init(initParameters: InitParameters): void;
        configure(configuration: SidebarConfiguration): void;
        checkGlobal(documentContent: string, options: CheckOptions): Check;
        onGlobalCheckRejected(): void;
        invalidateRanges(invalidCheckedDocumentRanges: InvalidDocumentPart[]): void;
        onVisibleRangesChanged(checkedDocumentRanges: CheckedDocumentRange[]): void;
        dispose(callback: () => void): void;
    }
    export interface AcrolinxPlugin {
        requestInit(): void;
        onInitFinished(finishResult: InitResult): void;
        configure(configuration: AcrolinxPluginConfiguration): void;
        requestGlobalCheck(options?: RequestGlobalCheckOptions): void;
        onCheckResult(checkResult: CheckResult): void;
        selectRanges(checkId: string, matches: Match[]): void;
        replaceRanges(checkId: string, matchesWithReplacements: MatchWithReplacement[]): void;
        download(downloadInfo: DownloadInfo): void;
        openWindow(openWindowParameters: OpenWindowParameters): void;
    }
    export const ErrorCodes: {
        checkIsAlreadyRunning: string;
        userIsNotLoggedIn: string;
        sidebarNotReadyForCheck: string;
        checkCanceledByUser: string;
        base64EncodedGzippedUnsupported: string;
    };
}

declare module 'acrolinx-sidebar-integration/floating-sidebar/floating-sidebar' {
    import { AsyncStorage } from "acrolinx-sidebar-integration/floating-sidebar/async-storage";
    export const SIDEBAR_ID = "acrolinxFloatingSidebar";
    export const TITLE_BAR_CLASS = "acrolinxFloatingSidebarTitleBar";
    export const CLOSE_ICON_CLASS = "acrolinxFloatingSidebarCloseIcon";
    export const SIDEBAR_CONTAINER_ID = "acrolinxSidebarContainer";
    export const SIDEBAR_DRAG_OVERLAY_ID = "acrolinxDragOverlay";
    export const SIDEBAR_GLASS_PANE_ID = "acrolinxFloatingSidebarGlassPane";
    export const FOOTER = "acrolinxFloatingSidebarFooter";
    export const RESIZE_ICON_CLASS = "acrolinxFloatingSidebarResizeIcon";
    export const IS_RESIZING_CLASS = "acrolinxFloatingSidebarIsResizing";
    export const IS_DRAGGED_CLASS = "acrolinxFloatingSidebarIsDragged";
    export const FOOTER_HEIGHT = 34;
    export interface PositionUpdate {
        top?: number;
        left?: number;
        height?: number;
    }
    export interface Position extends PositionUpdate {
        top: number;
        left: number;
        height: number;
    }
    export const DEFAULT_POS: Position;
    export const POSITION_KEY = "acrolinx.plugins.floatingSidebar.position";
    export function loadInitialPos(asyncStorage: AsyncStorage): Promise<Position>;
    export function keepVisible({left, top, height}: Position, windowWidth?: number, windowHeight?: number): Position;
    export interface FloatingSidebar {
        toggleVisibility(): void;
        remove(): void;
    }
    export interface FloatingSidebarConfig {
        asyncStorage: AsyncStorage;
    }
    export function initFloatingSidebar(config: FloatingSidebarConfig): FloatingSidebar;
}

declare module 'acrolinx-sidebar-integration/adapters/AdapterInterface' {
    import { Match, MatchWithReplacement, Check, CheckResult, DocumentSelection } from "acrolinx-sidebar-integration/acrolinx-libs/plugin-interfaces";
    export interface CommonAdapterConf {
        scrollOffsetY?: number;
    }
    export interface HasEditorID extends CommonAdapterConf {
        editorId: string;
    }
    export interface HasElement extends CommonAdapterConf {
        element: HTMLElement;
    }
    export type AdapterConf = HasEditorID | HasElement;
    export interface HasError {
        error: any;
    }
    export interface SuccessfulContentExtractionResult {
        content: string;
        documentReference?: string;
        selection?: DocumentSelection;
    }
    export interface AutobindWrapperAttributes {
        'orginal-id'?: string;
        'orginal-class'?: string;
        'orginal-name'?: string;
        'orginal-source'?: string;
        [key: string]: string | undefined;
    }
    export type ContentExtractionResult = SuccessfulContentExtractionResult | HasError;
    export interface ExtractContentForCheckOpts {
        checkSelection?: boolean;
    }
    export interface AdapterInterface {
        getEditor?(): any;
        getFormat?(): string;
        getContent?(): string;
        extractContentForCheck(opts: ExtractContentForCheckOpts): ContentExtractionResult | Promise<ContentExtractionResult>;
        registerCheckCall(checkInfo: Check): void;
        registerCheckResult(checkResult: CheckResult): void;
        selectRanges(checkId: string, matches: Match[]): void;
        replaceRanges(checkId: string, matchesWithReplacement: MatchWithReplacement[]): void;
        getAutobindWrapperAttributes?(): AutobindWrapperAttributes;
    }
    export function hasError(a: ContentExtractionResult): a is HasError;
    export function isSuccessfulContentExtractionResult(a: ContentExtractionResult): a is SuccessfulContentExtractionResult;
    export function hasEditorID(a: AdapterConf): a is HasEditorID;
    export function hasElement(a: AdapterConf): a is HasElement;
    export function getElementFromAdapterConf(conf: AdapterConf): HTMLElement;
}

declare module 'acrolinx-sidebar-integration/floating-sidebar/async-storage' {
    export interface AsyncStorage {
        get<T>(key: string): Promise<T | null>;
        set<T>(key: string, value: T): Promise<void>;
    }
    export class AsyncLocalStorage implements AsyncStorage {
        get<T>(key: string): Promise<T | null>;
        set<T>(key: string, value: T): Promise<undefined>;
    }
    export function loadFromLocalStorage<T>(key: string): T | null;
    export function saveToLocalStorage<T>(key: string, object: T): void;
}

declare module 'acrolinx-sidebar-integration/utils/alignment' {
    import { Match } from "acrolinx-sidebar-integration/acrolinx-libs/plugin-interfaces";
    export interface OffSetAlign {
        oldPosition: number;
        diffOffset: number;
    }
    export interface AlignedMatch<T extends Match> {
        originalMatch: T;
        range: [number, number];
    }
    export function findDisplacement(offsetMappingArray: OffSetAlign[], originalIndex: number): number;
    export function findNewIndex(offsetMappingArray: OffSetAlign[], originalIndex: number): number;
}

declare module 'acrolinx-sidebar-integration/utils/escaping' {
    import { OffSetAlign } from "acrolinx-sidebar-integration/utils/alignment";
    export interface EscapeHtmlCharactersResult {
        escapedText: string;
        backwardAlignment: OffSetAlign[];
    }
    export function escapeHtmlCharacters(text: string): EscapeHtmlCharactersResult;
}

